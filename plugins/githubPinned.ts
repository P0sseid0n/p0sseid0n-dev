import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'

export interface PinnedRepo {
  name: string
  description: string
  url: string
  homepage: string | null
  language: string | null
  stars: number
  topics: string[]
}

const VIRTUAL_ID = 'virtual:github-pinned'
const RESOLVED_ID = '\0' + VIRTUAL_ID

// GitHub has no REST endpoint for pinned repos, so we read them from the profile page
async function fetchPinnedNames(user: string): Promise<string[]> {
  const res = await fetch(`https://github.com/${user}`)
  if (!res.ok) throw new Error(`GitHub profile request failed: ${res.status}`)
  const html = await res.text()

  const names: string[] = []
  for (const block of html.split('pinned-item-list-item-content').slice(1)) {
    const match = block.match(/href="\/([^/"]+)\/([^/"]+)"[^>]*>\s*<span class="repo"/)
    if (match) names.push(`${match[1]}/${match[2]}`)
  }
  return names
}

async function fetchRepo(fullName: string, token?: string): Promise<PinnedRepo> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`https://api.github.com/repos/${fullName}`, { headers })
  if (!res.ok) throw new Error(`GitHub API request for ${fullName} failed: ${res.status}`)
  const repo = (await res.json()) as {
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    language: string | null
    stargazers_count: number
    topics?: string[]
  }

  return {
    name: repo.name,
    description: repo.description?.trim() ?? '',
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    stars: repo.stargazers_count,
    topics: repo.topics ?? [],
  }
}

interface DiskCache {
  user: string
  fetchedAt: number
  repos: PinnedRepo[]
}

// O vite-ssg roda dois builds (client e SSR); sem cache cada um refaz todas as chamadas
const CACHE_TTL = 60 * 60 * 1000

async function readDiskCache(file: string, user: string): Promise<DiskCache | undefined> {
  try {
    const data = JSON.parse(await readFile(file, 'utf8')) as DiskCache
    return data.user === user ? data : undefined
  } catch {
    return undefined
  }
}

export default function githubPinned(user: string, token?: string): Plugin {
  let cache: Promise<PinnedRepo[]> | undefined
  let cacheFile = ''
  let isBuild = false

  const load = async () => {
    const disk = await readDiskCache(cacheFile, user)
    if (disk && Date.now() - disk.fetchedAt < CACHE_TTL) return disk.repos

    try {
      const names = await fetchPinnedNames(user)
      const repos = await Promise.all(names.map((name) => fetchRepo(name, token)))
      await mkdir(dirname(cacheFile), { recursive: true })
      await writeFile(cacheFile, JSON.stringify({ user, fetchedAt: Date.now(), repos }))
      return repos
    } catch (error) {
      const message = `[github-pinned] ${(error as Error).message}`
      if (disk) {
        console.warn(`${message}; usando o cache de ${new Date(disk.fetchedAt).toLocaleString()}`)
        return disk.repos
      }
      // Melhor falhar o build do que publicar o site sem a seção de projetos
      if (isBuild) throw new Error(`${message}. Defina GITHUB_TOKEN para evitar o rate limit.`)
      console.warn(message)
      return []
    }
  }

  return {
    name: 'github-pinned',
    configResolved(config) {
      cacheFile = join(config.cacheDir, 'github-pinned.json')
      isBuild = config.command === 'build'
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    async load(id) {
      if (id !== RESOLVED_ID) return
      cache ??= load()
      return `export default ${JSON.stringify(await cache)}`
    },
  }
}
