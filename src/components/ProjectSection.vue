<script setup lang="ts">
import IconRocketLaunch from '~icons/material-symbols/rocket-launch'
import IconStar from '~icons/material-symbols/star'
import IconCode from '~icons/material-symbols/code'
import IconVisibility from '~icons/material-symbols/visibility'
import IconAdd from '~icons/material-symbols/add'
import pinnedRepos from 'virtual:github-pinned'

interface Project {
  title: string
  description: string
  technologies: string[]
  stars: number
  codeLink: string
  previewLink?: string
}

// Dados extras que o GitHub não fornece, indexados pelo nome do repositório
const extras: Record<string, Partial<Pick<Project, 'title' | 'technologies' | 'previewLink'>>> = {
  Placar: {
    technologies: ['Nuxt.js', 'Vue.js', 'Pinia', 'Supabase', 'Scss'],
  },
  pomoshot: {
    title: 'Pomoshot',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Bun',
      'Elysia',
      'Eden Treaty',
      'Google GenAI',
    ],
  },
  'jobs-scraper': {
    title: 'Jobs Scraper',
    technologies: [
      'Node.js',
      'TypeScript',
      'Puppeteer',
      'RabbitMQ',
      'MongoDB',
      'Discord.js',
      'IA generativa',
    ],
  },
}

// O próprio portfólio não aparece na lista de projetos
const ignored = ['p0sseid0n-dev']

const projects: Project[] = pinnedRepos
  .filter((repo) => !ignored.includes(repo.name))
  .map((repo) => {
    const extra = extras[repo.name] ?? {}
    return {
      title: extra.title ?? repo.name,
      description: repo.description,
      technologies:
        extra.technologies ??
        (repo.topics.length ? repo.topics : repo.language ? [repo.language] : []),
      stars: repo.stars,
      codeLink: repo.url,
      previewLink: extra.previewLink ?? repo.homepage ?? undefined,
    }
  })
</script>

<template>
  <section class="w-full max-w-240 mx-auto px-4 py-16 scroll-mt-20" id="projetos">
    <h2 class="text-2xl font-bold text-white flex items-center gap-3 mb-8">
      <IconRocketLaunch class="text-accent" />
      Projetos Recentes
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="project in projects"
        :key="project.title"
        class="flex flex-col h-full rounded-xl border border-card-border bg-card-dark p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <h3 class="font-bold text-lg text-white">{{ project.title }}</h3>
          <a
            class="flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors"
            :href="project.codeLink"
            target="_blank"
            rel="noopener"
            :title="`Dar estrela em ${project.title}`"
          >
            <IconStar class="text-[20px]" />
            {{ project.stars }}
          </a>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed mb-6 grow">
          {{ project.description }}
        </p>
        <ul class="flex flex-wrap gap-2 mb-4">
          <li
            v-for="tech in project.technologies"
            :key="tech"
            class="text-xs font-medium text-[#9bb0bf] bg-background-dark px-2 py-1 rounded border border-card-border"
          >
            {{ tech }}
          </li>
        </ul>
        <div class="flex items-center gap-4 mt-auto pt-4 border-t border-card-border">
          <a
            class="text-sm font-bold text-white hover:text-accent transition-colors flex items-center gap-1"
            :href="project.codeLink"
            target="_blank"
            rel="noopener"
          >
            <IconCode class="text-base" />
            Código
          </a>
          <a
            v-if="project.previewLink"
            class="text-sm font-bold text-white hover:text-accent transition-colors flex items-center gap-1"
            :href="project.previewLink"
            target="_blank"
            rel="noopener"
          >
            <IconVisibility class="text-base" />
            Preview
          </a>
        </div>
      </article>

      <a
        class="flex flex-col h-full rounded-xl border border-dashed border-card-border bg-transparent p-6 items-center justify-center gap-4 group cursor-pointer hover:border-accent hover:bg-card-dark/50 transition-all"
        href="https://github.com/P0sseid0n?tab=repositories"
        target="_blank"
        rel="noopener"
      >
        <div
          class="h-12 w-12 rounded-full bg-card-border flex items-center justify-center group-hover:bg-primary transition-colors"
        >
          <IconAdd class="text-white" />
        </div>
        <h3 class="font-medium text-gray-400 group-hover:text-white">Ver mais no Github</h3>
      </a>
    </div>
  </section>
</template>
