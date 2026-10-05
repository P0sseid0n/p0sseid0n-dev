// Só pode ser chamado no navegador (onMounted ou handlers de evento)
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
