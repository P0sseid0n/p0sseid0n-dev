<script setup lang="ts">
import { Icon } from '@iconify/vue'
const technologies = [
  { name: 'HTML', icon: 'simple-icons:html5' },
  { name: 'CSS / SCSS', icon: 'simple-icons:css3' },
  { name: 'Vue.js', icon: 'simple-icons:vuedotjs' },
  { name: 'Nuxt.js', icon: 'simple-icons:nuxt' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
  { name: 'Tailwind', icon: 'simple-icons:tailwindcss' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { name: 'Bun', icon: 'simple-icons:bun' },
  { name: 'Express', icon: 'simple-icons:express' },
  { name: 'MongoDB', icon: 'simple-icons:mongodb' },
  { name: 'MySQL', icon: 'simple-icons:mysql' },
  { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
  { name: 'Prisma', icon: 'simple-icons:prisma' },
  { name: 'AdonisJS', icon: 'simple-icons:adonisjs' },
  { name: 'NestJS', icon: 'simple-icons:nestjs' },
  { name: 'React Native', icon: 'simple-icons:react' },
  { name: 'JavaScript', icon: 'simple-icons:javascript' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'Python', icon: 'simple-icons:python' },
  { name: 'Golang', icon: 'simple-icons:go' },
  { name: 'Lua', icon: 'simple-icons:lua' },
  { name: 'Git', icon: 'simple-icons:git' },
  { name: 'Docker', icon: 'simple-icons:docker' },
  { name: 'Figma', icon: 'simple-icons:figma' },
  { name: 'Jest', icon: 'simple-icons:jest' },
  { name: 'Vitest', icon: 'simple-icons:vitest' },
  { name: 'Cypress', icon: 'simple-icons:cypress' },
  { name: 'Linux', icon: 'simple-icons:linux' },
  { name: 'Github', icon: 'simple-icons:github' },
  { name: 'VS Code', icon: 'simple-icons:visualstudiocode' },
  { name: 'Webpack', icon: 'simple-icons:webpack' },
  { name: 'Vite', icon: 'simple-icons:vite' },
  { name: 'ESLint', icon: 'simple-icons:eslint' },
  { name: 'Prettier', icon: 'simple-icons:prettier' },
]

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5)
}

const list = [...shuffle(technologies), ...shuffle(technologies)]

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
        <Icon icon="material-symbols:memory" class="text-accent" />
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
              v-for="(tech, i) in list"
              :key="`${tech.name}-${col}-${i}`"
              class="p-4 rounded-xl bg-card-dark border border-card-border group hover:border-accent transition-all flex flex-col items-center justify-center gap-2 h-28 shrink-0"
            >
              <Icon
                :icon="tech.icon"
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
