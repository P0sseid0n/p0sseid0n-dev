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

export default function githubPinned(user: string, token?: string): Plugin {
  let cache: Promise<PinnedRepo[]> | undefined

  const load = async () => {
    try {
      const names = await fetchPinnedNames(user)
      return await Promise.all(names.map((name) => fetchRepo(name, token)))
    } catch (error) {
      console.warn(`[github-pinned] ${(error as Error).message}`)
      return []
    }
  }

  return {
    name: 'github-pinned',
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
