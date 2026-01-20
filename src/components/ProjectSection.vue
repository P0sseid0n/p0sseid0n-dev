<script setup lang="ts">
import { Icon } from '@iconify/vue'
interface Project {
  title: string
  description: string
  technologies: string[]
  codeLink?: string
  previewLink?: string
  docsLink?: string
}

const projects: Project[] = [
  {
    title: 'Placar',
    description: 'Projeto para contabilizar em tempo real pontos de qualquer competição',
    technologies: ['Nuxt.js', 'Vue.js', 'Pinia', 'Supabase', 'Scss'],
    codeLink: 'https://github.com/P0sseid0n/Placar',
  },
  {
    title: 'Pomoshot',
    description:
      'Transforme suas capturas de tela em um plano de estudo Pomodoro estruturado com IA.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Bun',
      'Elysia',
      'Eden Treaty',
      'Google GenAI',
    ],
    codeLink: 'https://github.com/P0sseid0n/pomoshot',
    previewLink: 'https://pomoshot.p0sseid0n.dev/',
  },
  {
    title: 'Jobs Scraper',
    description:
      'Este projeto é um pipeline completo para coleta, processamento, armazenamento e divulgação de vagas de emprego extraídas do LinkedIn',
    technologies: [
      'Node.js',
      'TypeScript',
      'Puppeteer',
      'RabbitMQ',
      'MongoDB',
      'Discord.js',
      'IA generativa',
    ],
    codeLink: 'https://github.com/P0sseid0n/jobs-scraper',
  },
]
</script>

<template>
  <section class="w-full max-w-240 mx-auto px-4 py-16 scroll-mt-20" id="projetos">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <Icon icon="material-symbols:rocket-launch" class="text-accent" />
        Projetos Recentes
      </h2>
      <a
        class="text-sm text-accent hover:text-white transition-colors flex items-center gap-1"
        href="https://github.com/P0sseid0n?tab=repositories"
        target="_blank"
      >
        Ver todos
        <Icon icon="material-symbols:arrow-forward" class="text-sm" />
      </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="project in projects"
        :key="project.title"
        class="flex flex-col h-full rounded-xl border border-card-border bg-card-dark p-6 transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(34,82,119,0.3)]"
      >
        <div class="flex items-start justify-between mb-4">
          <h3 class="font-bold text-lg text-white">{{ project.title }}</h3>
          <div class="flex gap-2">
            <Icon
              icon="material-symbols:star"
              class="text-gray-500 hover:text-white cursor-pointer text-[20px]"
            />
          </div>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-6 grow">
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="text-xs font-medium text-[#9bb0bf] bg-background-dark px-2 py-1 rounded border border-card-border"
          >
            {{ tech }}
          </span>
        </div>
        <div class="flex items-center gap-4 mt-auto pt-4 border-t border-card-border">
          <a
            v-if="project.codeLink"
            class="text-xs font-bold text-white hover:text-accent uppercase tracking-wider flex items-center gap-1"
            :href="project.codeLink"
          >
            <Icon icon="material-symbols:code" class="text-base" />
            Código
          </a>
          <a
            v-if="project.previewLink"
            class="text-xs font-bold text-white hover:text-accent uppercase tracking-wider flex items-center gap-1"
            :href="project.previewLink"
          >
            <Icon icon="material-symbols:visibility" class="text-base" />
            Preview
          </a>
        </div>
      </article>

      <a
        class="flex flex-col h-full rounded-xl border border-dashed border-card-border bg-transparent p-6 items-center justify-center gap-4 group cursor-pointer hover:border-accent hover:bg-card-dark/50 transition-all"
        href="https://github.com/P0sseid0n?tab=repositories"
        target="_blank"
      >
        <div
          class="h-12 w-12 rounded-full bg-card-border flex items-center justify-center group-hover:bg-primary transition-colors"
        >
          <Icon icon="material-symbols:add" class="text-white" />
        </div>
        <h3 class="font-medium text-gray-400 group-hover:text-white">Ver mais no Github</h3>
      </a>
    </div>
  </section>
</template>
