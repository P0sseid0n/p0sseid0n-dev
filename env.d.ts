/// <reference types="vite/client" />

declare module 'virtual:github-pinned' {
  const repos: import('./plugins/githubPinned').PinnedRepo[]
  export default repos
}
