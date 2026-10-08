<script setup lang="ts">
import IconMail from '~icons/material-symbols/mail'
import IconDownload from '~icons/material-symbols/download'
import IconGithub from '~icons/simple-icons/github'
import IconLinkedin from '~icons/simple-icons/linkedin'
import AnimationMagnet from './AnimationMagnet.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="w-full border-t border-card-border bg-background-deep py-16 mt-12" id="contato">
    <div class="mx-auto max-w-240 px-4 flex flex-col items-center text-center">
      <h2 class="text-2xl font-bold text-fg mb-6">
        Quer conversar sobre um projeto ou uma vaga?
      </h2>
      <p class="text-fg-muted max-w-md mb-8">
        Estou aberto a novas oportunidades e projetos. O jeito mais rápido de falar comigo é por
        e-mail.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <AnimationMagnet :padding="48">
          <a
            class="inline-flex items-center gap-2 rounded-lg bg-accent text-on-accent px-6 py-3 font-bold hover:bg-fg hover:text-background transition-colors"
            href="mailto:matheuspossidoniom@outlook.com"
          >
            <IconMail class="text-lg" />
            Enviar e-mail
          </a>
        </AnimationMagnet>
        <a
          class="inline-flex items-center gap-2 rounded-lg border border-accent text-accent px-6 py-3 font-bold hover:bg-accent/10 transition-colors shadow-neon"
          href="https://docs.google.com/document/d/1rLACVhPBc8_sdbDZ1i05ssPZ02NsAOq3yxJHEB-PdH4/export?format=pdf&tab=1"
          download
        >
          <IconDownload class="text-lg" />
          Baixar CV
        </a>
      </div>
      <div class="flex gap-8 mt-12">
        <a
          class="text-fg-muted hover:text-accent transition-colors"
          href="https://github.com/P0sseid0n"
          target="_blank"
          rel="noopener"
        >
          <span class="sr-only">Github</span>
          <IconGithub class="size-6" />
        </a>
        <a
          class="text-fg-muted hover:text-accent transition-colors"
          href="https://www.linkedin.com/in/matheus-possidonio/"
          target="_blank"
          rel="noopener"
        >
          <span class="sr-only">LinkedIn</span>
          <IconLinkedin class="size-6" />
        </a>
      </div>
      <div class="mt-12 text-xs text-fg-muted font-mono">
        © {{ year }} P0sseid0n. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>
