/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />

declare module 'virtual:github-pinned' {
  const repos: import('./plugins/githubPinned').PinnedRepo[]
  export default repos
}
