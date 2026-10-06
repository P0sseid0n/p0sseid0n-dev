<script setup lang="ts">
import IconMemory from '~icons/material-symbols/memory'
import SiHtml5 from '~icons/simple-icons/html5'
import SiCss3 from '~icons/simple-icons/css3'
import SiVuedotjs from '~icons/simple-icons/vuedotjs'
import SiNuxt from '~icons/simple-icons/nuxt'
import SiReact from '~icons/simple-icons/react'
import SiNextdotjs from '~icons/simple-icons/nextdotjs'
import SiTailwindcss from '~icons/simple-icons/tailwindcss'
import SiNodedotjs from '~icons/simple-icons/nodedotjs'
import SiBun from '~icons/simple-icons/bun'
import SiExpress from '~icons/simple-icons/express'
import SiMongodb from '~icons/simple-icons/mongodb'
import SiMysql from '~icons/simple-icons/mysql'
import SiPostgresql from '~icons/simple-icons/postgresql'
import SiPrisma from '~icons/simple-icons/prisma'
import SiAdonisjs from '~icons/simple-icons/adonisjs'
import SiNestjs from '~icons/simple-icons/nestjs'
import SiJavascript from '~icons/simple-icons/javascript'
import SiTypescript from '~icons/simple-icons/typescript'
import SiPython from '~icons/simple-icons/python'
import SiGo from '~icons/simple-icons/go'
import SiLua from '~icons/simple-icons/lua'
import SiGit from '~icons/simple-icons/git'
import SiDocker from '~icons/simple-icons/docker'
import SiFigma from '~icons/simple-icons/figma'
import SiJest from '~icons/simple-icons/jest'
import SiVitest from '~icons/simple-icons/vitest'
import SiCypress from '~icons/simple-icons/cypress'
import SiLinux from '~icons/simple-icons/linux'
import SiGithub from '~icons/simple-icons/github'
import SiVisualstudiocode from '~icons/simple-icons/visualstudiocode'
import SiWebpack from '~icons/simple-icons/webpack'
import SiVite from '~icons/simple-icons/vite'
import SiEslint from '~icons/simple-icons/eslint'
import SiPrettier from '~icons/simple-icons/prettier'

const technologies = [
  { name: 'HTML', icon: SiHtml5 },
  { name: 'CSS / SCSS', icon: SiCss3 },
  { name: 'Vue.js', icon: SiVuedotjs },
  { name: 'Nuxt.js', icon: SiNuxt },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Bun', icon: SiBun },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'AdonisJS', icon: SiAdonisjs },
  { name: 'NestJS', icon: SiNestjs },
  { name: 'React Native', icon: SiReact },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'Golang', icon: SiGo },
  { name: 'Lua', icon: SiLua },
  { name: 'Git', icon: SiGit },
  { name: 'Docker', icon: SiDocker },
  { name: 'Figma', icon: SiFigma },
  { name: 'Jest', icon: SiJest },
  { name: 'Vitest', icon: SiVitest },
  { name: 'Cypress', icon: SiCypress },
  { name: 'Linux', icon: SiLinux },
  { name: 'Github', icon: SiGithub },
  { name: 'VS Code', icon: SiVisualstudiocode },
  { name: 'Webpack', icon: SiWebpack },
  { name: 'Vite', icon: SiVite },
  { name: 'ESLint', icon: SiEslint },
  { name: 'Prettier', icon: SiPrettier },
]

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5)
}

const shuffled = shuffle(technologies)

// Cada coluna começa num ponto diferente da lista para não repetir as vizinhas.
// A lista é duplicada para o loop da animação (translateY -50%) ficar contínuo.
function columnList(col: number) {
  const offset = Math.floor((col * shuffled.length) / 6)
  const rotated = [...shuffled.slice(offset), ...shuffled.slice(0, offset)]
  return [...rotated, ...rotated]
}

function getResponsiveColumnVisibility(col: number) {
  return (
    {
      1: '',
      2: '',
      3: 'hidden xs:flex',
      4: 'hidden sm:flex',
      5: 'hidden md:flex',
      6: 'hidden lg:flex',
    }[col] ?? ''
  )
}
</script>

<template>
  <section class="w-full max-w-240 mx-auto px-4 py-16 scroll-mt-20" id="tecnologias">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-white flex items-center gap-3">
        <IconMemory class="text-accent" />
        Tecnologias
      </h2>
      <div class="h-px flex-1 bg-card-border ml-6"></div>
    </div>

    <div
      class="relative h-150 w-full overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
    >
      <div class="grid grid-flow-col auto-cols-fr gap-4 h-full">
        <div
          v-for="col in 6"
          :key="col"
          class="relative flex flex-col overflow-hidden"
          :class="getResponsiveColumnVisibility(col)"
        >
          <div
            class="flex flex-col gap-4 hover:[animation-play-state:paused]!"
            :class="col % 2 ? 'animate-vertical-scroll-up' : 'animate-vertical-scroll-down'"
            :style="{ animationDuration: `${150 + col * 10}s` }"
          >
            <div
              v-for="(tech, i) in columnList(col)"
              :key="`${tech.name}-${col}-${i}`"
              class="p-4 rounded-xl bg-card-dark border border-card-border group hover:border-accent transition-all flex flex-col items-center justify-center gap-2 h-28 shrink-0"
              :aria-hidden="col !== 1"
            >
              <component
                :is="tech.icon"
                class="text-4xl text-gray-400 group-hover:text-accent transition-colors"
              />

              <span class="text-xs font-medium text-gray-300">
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-vertical-scroll-up {
  animation: vertical-scroll-up 10s linear infinite;
}

.animate-vertical-scroll-down {
  animation: vertical-scroll-down 10s linear infinite;
}

.animate-infinite-scroll {
  animation: infinite-scroll 25s linear infinite;
}

@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes vertical-scroll-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

@keyframes vertical-scroll-down {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
