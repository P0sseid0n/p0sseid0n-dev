<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AnimationMagnet from './AnimationMagnet.vue'
</script>

<template>
  <footer class="w-full border-t border-card-border bg-[#0f1318] py-16 mt-12" id="contato">
    <div class="mx-auto max-w-240 px-4 flex flex-col items-center text-center">
      <h2 class="text-2xl font-bold text-white mb-6">Vamos construir o futuro juntos?</h2>
      <p class="text-gray-400 max-w-md mb-8">
        Estou sempre aberto a novos desafios e parcerias. Se você tem um projeto audacioso, entre em
        contato.
      </p>

      <AnimationMagnet>
        <a
          class="inline-flex items-center gap-2 rounded-lg bg-accent text-[#0f1318] px-6 py-3 font-bold hover:bg-white transition-colors"
          href="mailto:matheuspossidoniom@outlook.com"
        >
          <Icon icon="material-symbols:mail" class="text-lg" />
          Mandar Mensagem
        </a>
      </AnimationMagnet>
      <div class="flex gap-8 mt-12">
        <a
          class="text-gray-500 hover:text-accent transition-colors"
          href="https://github.com/P0sseid0n"
          target="_blank"
        >
          <span class="sr-only">Github</span>
          <Icon icon="simple-icons:github" class="size-6" />
        </a>
        <a
          class="text-gray-500 hover:text-accent transition-colors"
          href="https://www.linkedin.com/in/matheus-possidonio/"
          target="_blank"
        >
          <span class="sr-only">LinkedIn</span>
          <Icon icon="simple-icons:linkedin" class="size-6" />
        </a>
      </div>
      <div class="mt-12 text-xs text-gray-600 font-mono">
        © 2026 P0sseid0n. All rights reserved.
      </div>
    </div>
  </footer>
</template>
