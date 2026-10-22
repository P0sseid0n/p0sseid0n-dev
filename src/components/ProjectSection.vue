<script setup lang="ts">
import IconStar from '~icons/material-symbols/star'
import IconCode from '~icons/material-symbols/code'
import IconVisibility from '~icons/material-symbols/visibility'
import IconArrowOutward from '~icons/material-symbols/arrow-outward'
import pinnedRepos from 'virtual:github-pinned'
import SectionTitle from './SectionTitle.vue'

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

// O grid tem duas colunas: até 3 projetos o card "Ver mais" fecha a última linha;
// com 4 ele sobe para o título e o grid fica 2×2. Acima disso, corta.
const MAX_PROJECTS = 4

const projects: Project[] = pinnedRepos
  .filter((repo) => !ignored.includes(repo.name))
  .slice(0, MAX_PROJECTS)
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

const moreInTitle = projects.length === MAX_PROJECTS
const reposUrl = 'https://github.com/P0sseid0n?tab=repositories'
</script>

<template>
  <section class="w-full max-w-240 mx-auto px-4 pt-16 pb-20" id="projetos">
    <SectionTitle path="projetos">
      Projetos recentes
      <template v-if="moreInTitle" #action>
        <a
          class="flex items-center gap-1 font-mono text-sm text-fg-subtle hover:text-accent transition-colors"
          :href="reposUrl"
          target="_blank"
          rel="noopener"
        >
          Ver mais no GitHub
          <IconArrowOutward class="text-base" />
        </a>
      </template>
    </SectionTitle>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="project in projects"
        :key="project.title"
        class="flex flex-col h-full rounded-2xl border border-card-border bg-card shadow-card p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <h3 class="font-semibold text-xl tracking-tight text-fg">{{ project.title }}</h3>
          <a
            class="flex items-center gap-1 text-sm font-mono tabular-nums text-fg-subtle hover:text-fg transition-colors"
            :href="project.codeLink"
            target="_blank"
            rel="noopener"
            :title="`Dar estrela em ${project.title}`"
            :aria-label="`${project.stars} ${project.stars === 1 ? 'estrela' : 'estrelas'} no GitHub. Dar estrela em ${project.title}`"
          >
            <IconStar class="text-lg" />
            {{ project.stars }}
          </a>
        </div>
        <p class="text-fg-muted text-[0.9375rem] leading-relaxed mb-6 grow">
          {{ project.description }}
        </p>
        <ul class="flex flex-wrap gap-2 mb-4">
          <li
            v-for="tech in project.technologies"
            :key="tech"
            class="text-xs font-mono text-tag bg-background px-2 py-1 rounded border border-card-border"
          >
            {{ tech }}
          </li>
        </ul>
        <div class="flex items-center gap-4 mt-auto pt-4 border-t border-card-border">
          <a
            class="text-sm font-semibold text-fg hover:text-accent transition-colors flex items-center gap-1.5"
            :href="project.codeLink"
            target="_blank"
            rel="noopener"
          >
            <IconCode class="text-base" />
            Código
          </a>
          <a
            v-if="project.previewLink"
            class="text-sm font-semibold text-fg hover:text-accent transition-colors flex items-center gap-1.5"
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
        v-if="!moreInTitle"
        class="flex min-h-48 flex-col h-full rounded-2xl border border-dashed border-border-strong/60 bg-transparent p-6 items-center justify-center gap-4 group hover:border-accent hover:bg-card/50 transition-colors duration-300"
        :href="reposUrl"
        target="_blank"
        rel="noopener"
      >
        <div
          class="size-12 rounded-xl bg-card-border flex items-center justify-center group-hover:bg-accent transition-colors duration-300"
        >
          <IconArrowOutward
            class="text-xl text-fg transition-[color,transform] duration-300 group-hover:text-on-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <h3 class="font-medium text-fg-muted group-hover:text-fg transition-colors">
          Ver mais no GitHub
        </h3>
      </a>
    </div>
  </section>
</template>
