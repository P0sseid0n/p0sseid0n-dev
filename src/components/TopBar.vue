<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import IconTerminal from '~icons/material-symbols/terminal'
import IconMenu from '~icons/material-symbols/menu'
import IconClose from '~icons/material-symbols/close'
import IconLightMode from '~icons/material-symbols/light-mode'
import IconDarkMode from '~icons/material-symbols/dark-mode'
import { useTheme } from '@/utils/theme'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

const menuOpen = ref(false)

// Seção visível no momento, para destacar o link correspondente
const activeHref = ref('')
let observer: IntersectionObserver | undefined
let sectionAtMiddle = ''

// O footer (#contato) é baixo demais para cruzar o meio da tela, então no fim da página ele vence
function updateActive() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  activeHref.value = atBottom ? links.at(-1)!.href : sectionAtMiddle
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const href = `#${entry.target.id}`
        if (entry.isIntersecting) sectionAtMiddle = href
        else if (sectionAtMiddle === href) sectionAtMiddle = ''
      }
      updateActive()
    },
    // Faixa fina no meio da tela: a seção ativa é a que cruza essa linha
    { rootMargin: '-45% 0px -55% 0px' },
  )
  for (const link of links) {
    const el = document.querySelector(link.href)
    if (el) observer.observe(el)
  }
  window.addEventListener('scroll', updateActive, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', updateActive)
})

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <a
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
    href="#conteudo"
  >
    Pular para o conteúdo
  </a>
  <header
    class="fixed top-0 z-50 w-full border-b border-card-border bg-background"
    @keydown.esc="menuOpen = false"
  >
    <div class="mx-auto flex h-16 max-w-240 items-center justify-between px-4 lg:px-0">
      <a
        class="flex items-center gap-2 text-xl font-bold tracking-tight text-fg transition-colors hover:text-accent"
        href="#"
        @click="menuOpen = false"
      >
        <IconTerminal class="text-accent" />
        P0sseid0n
      </a>
      <div class="flex items-center gap-2 sm:gap-8">
        <nav class="hidden sm:flex items-center gap-8" aria-label="Principal">
          <a
            v-for="link in links"
            :key="link.href"
            class="relative py-1 text-sm font-medium transition-colors hover:text-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300"
            :class="
              activeHref === link.href
                ? 'text-fg after:scale-x-100'
                : 'text-fg-soft after:scale-x-0'
            "
            :href="link.href"
            :aria-current="activeHref === link.href ? 'location' : undefined"
          >
            {{ link.label }}
          </a>
        </nav>
        <!-- O ícone troca via CSS (variante light:), então o HTML gerado no build já sai certo -->
        <button
          class="flex size-10 items-center justify-center rounded-lg border border-card-border text-fg-soft hover:text-accent hover:border-accent transition-colors cursor-pointer"
          type="button"
          :aria-label="theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
          :title="theme === 'dark' ? 'Tema claro' : 'Tema escuro'"
          @click="toggleTheme"
        >
          <IconLightMode class="text-xl light:hidden" />
          <IconDarkMode class="text-xl hidden light:block" />
        </button>
        <button
          class="sm:hidden -mr-2 flex size-11 items-center justify-center text-fg-soft hover:text-accent transition-colors"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="menu-mobile"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <IconClose v-if="menuOpen" class="text-2xl" />
          <IconMenu v-else class="text-2xl" />
        </button>
      </div>
    </div>
    <nav
      v-show="menuOpen"
      id="menu-mobile"
      class="sm:hidden border-t border-card-border px-4 py-2"
      aria-label="Principal"
    >
      <a
        v-for="link in links"
        :key="link.href"
        class="block py-3 text-base font-medium hover:text-accent transition-colors"
        :class="activeHref === link.href ? 'text-accent' : 'text-fg-soft'"
        :href="link.href"
        :aria-current="activeHref === link.href ? 'location' : undefined"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
