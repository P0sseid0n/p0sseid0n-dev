import type { Config } from '@netlify/functions'

// Idade, tempo de experiência e projetos fixados no GitHub entram no HTML no build.
// Um rebuild semanal mantém atualizado o que buscadores e IAs leem, mesmo sem commits.
export default async () => {
  const hookUrl = Netlify.env.get('BUILD_HOOK_URL')
  if (!hookUrl) throw new Error('BUILD_HOOK_URL não definida')

  const url = new URL(hookUrl)
  url.searchParams.set('trigger_title', 'Rebuild semanal agendado')

  const res = await fetch(url, { method: 'POST' })
  if (!res.ok) throw new Error(`Build hook respondeu ${res.status}`)
}

export const config: Config = {
  // Segunda às 9h UTC (6h em Brasília)
  schedule: '0 9 * * 1',
}
