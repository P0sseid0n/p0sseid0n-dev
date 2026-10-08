import { onMounted, ref } from 'vue'

export type Theme = 'dark' | 'light'

// Mesma chave e mesmas cores usadas pelo script inline do index.html
const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#14181f', light: '#f7f9fc' }

// Estado compartilhado entre componentes; 'dark' até o navegador dizer o contrário (SSG)
const theme = ref<Theme>('dark')

function applyTheme(value: Theme) {
  document.documentElement.dataset.theme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[value])
}

export function useTheme() {
  onMounted(() => {
    theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(theme.value)
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // Sem acesso ao storage (modo privado etc.): o tema vale só para esta visita
    }
  }

  return { theme, toggleTheme }
}
