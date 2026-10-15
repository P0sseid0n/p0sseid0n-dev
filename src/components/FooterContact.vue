<script setup lang="ts">
import IconMail from '~icons/material-symbols/mail'
import IconDownload from '~icons/material-symbols/download'
import IconGithub from '~icons/simple-icons/github'
import IconLinkedin from '~icons/simple-icons/linkedin'
import IconX from '~icons/simple-icons/x'
import AnimationMagnet from './AnimationMagnet.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="w-full border-t border-card-border bg-background-deep pt-20 pb-12 mt-12"
    id="contato"
  >
    <div class="mx-auto max-w-240 px-4 flex flex-col items-center text-center">
      <p class="mb-3 font-mono text-xs text-accent">
        <span class="text-fg-subtle">~/</span>contato
      </p>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-fg mb-5 max-w-xl">
        Quer conversar sobre um projeto ou uma vaga?
      </h2>
      <p class="text-fg-muted max-w-md mb-10">
        Estou aberto a novas oportunidades e projetos. O jeito mais rápido de falar comigo é por
        e-mail.
      </p>

      <div class="flex flex-wrap justify-center gap-4">
        <AnimationMagnet :padding="48">
          <a
            class="inline-flex items-center gap-2 rounded-lg bg-accent text-on-accent px-6 py-3 font-semibold transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-hover hover:shadow-glow active:scale-[0.98]"
            href="mailto:matheuspossidoniom@outlook.com"
          >
            <IconMail class="text-lg" />
            Enviar e-mail
          </a>
        </AnimationMagnet>
        <a
          class="inline-flex items-center gap-2 rounded-lg border border-border-strong text-fg-soft px-6 py-3 font-semibold transition-[border-color,color,transform] duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
          href="https://docs.google.com/document/d/1rLACVhPBc8_sdbDZ1i05ssPZ02NsAOq3yxJHEB-PdH4/export?format=pdf&tab=1"
          download
        >
          <IconDownload class="text-lg" />
          Baixar CV
        </a>
      </div>
      <div class="flex gap-4 mt-12">
        <a
          class="flex size-11 items-center justify-center rounded-lg text-fg-muted hover:text-accent hover:bg-card transition-colors"
          href="https://github.com/P0sseid0n"
          target="_blank"
          rel="me noopener"
        >
          <span class="sr-only">GitHub</span>
          <IconGithub class="size-6" />
        </a>
        <a
          class="flex size-11 items-center justify-center rounded-lg text-fg-muted hover:text-accent hover:bg-card transition-colors"
          href="https://www.linkedin.com/in/matheus-possidonio/"
          target="_blank"
          rel="me noopener"
        >
          <span class="sr-only">LinkedIn</span>
          <IconLinkedin class="size-6" />
        </a>
        <a
          class="flex size-11 items-center justify-center rounded-lg text-fg-muted hover:text-accent hover:bg-card transition-colors"
          href="https://x.com/notP0sseid0n"
          target="_blank"
          rel="me noopener"
        >
          <span class="sr-only">X (Twitter)</span>
          <IconX class="size-6" />
        </a>
      </div>
      <div class="mt-10 text-xs text-fg-subtle font-mono">
        © {{ year }} P0sseid0n. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>
