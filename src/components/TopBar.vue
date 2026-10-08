<script setup lang="ts">
import { ref } from 'vue'
import IconTerminal from '~icons/material-symbols/terminal'
import IconMenu from '~icons/material-symbols/menu'
import IconClose from '~icons/material-symbols/close'
import IconLightMode from '~icons/material-symbols/light-mode'
import IconDarkMode from '~icons/material-symbols/dark-mode'
import { useTheme } from '@/utils/theme'

const links = [
  { href: '#sobre', label: 'Sobre Mim' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

const menuOpen = ref(false)

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full border-b border-card-border bg-background/80 backdrop-blur-md"
    @keydown.esc="menuOpen = false"
  >
    <div class="mx-auto flex h-16 max-w-240 items-center justify-between px-4 lg:px-0">
      <a
        class="flex items-center gap-2 text-xl font-bold tracking-tight text-fg transition-transform hover:scale-105"
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
            class="text-sm font-medium text-fg-soft hover:text-accent transition-colors"
            :href="link.href"
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
          class="sm:hidden -mr-2 p-2 text-fg-soft hover:text-accent transition-colors"
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
        class="block py-3 text-base font-medium text-fg-soft hover:text-accent transition-colors"
        :href="link.href"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
