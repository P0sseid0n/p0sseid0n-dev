<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full border-b border-card-border bg-background-dark/80 backdrop-blur-md"
  >
    <div class="mx-auto flex h-16 max-w-240 items-center justify-between px-4 lg:px-0">
      <div class="flex items-center gap-2 text-white transition-transform hover:scale-105">
        <Icon icon="material-symbols:terminal" class="text-accent" />
        <h2 class="text-xl font-bold tracking-tight text-white">P0sseid0n</h2>
      </div>
      <nav class="hidden sm:flex items-center gap-8">
        <a
          class="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
          href="#sobre"
        >
          Sobre Mim
        </a>
        <a
          class="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
          href="#tecnologias"
        >
          Tecnologias
        </a>
        <a
          class="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
          href="#projetos"
        >
          Projetos
        </a>
        <a
          class="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
          href="#contato"
        >
          Contato
        </a>
      </nav>
    </div>
  </header>
</template>
