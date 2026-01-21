<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

const currentName = ref('P0sseid0n')
const otherName = computed(() => (currentName.value === 'P0sseid0n' ? 'Matheus' : 'P0sseid0n'))
const rotationIcon = ref(0)

function toggleName() {
  currentName.value = otherName.value

  rotationIcon.value += 360
}

const roles = [
  'Front-end',
  'Back-end',
  'Fullstack',
  'Javascript',
  'Typescript',
  'Vue.js',
  'React.js',
  'Node.js',
  'Python',
]

const role = ref(roles[0]!)
let roleIndex = 0

const TYPE_SPEED = 120
const ERASE_SPEED = 80
const HOLD_TIME = 4_500

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function type(text: string) {
  role.value = ''
  for (let i = 0; i < text.length; i++) {
    role.value += text[i]
    await sleep(TYPE_SPEED)
  }
}

async function erase() {
  while (role.value.length) {
    role.value = role.value.slice(0, -1)
    await sleep(ERASE_SPEED)
  }
}

async function loopTyping() {
  while (true) {
    await sleep(HOLD_TIME)
    await erase()

    roleIndex = (roleIndex + 1) % roles.length
    await type(roles[roleIndex]!)
  }
}

onMounted(loopTyping)
</script>

<template>
  <section
    class="relative w-full px-4 py-24 md:py-48 flex flex-col items-center justify-center gap-12 text-center"
  >
    <div class="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
    <div class="flex flex-col gap-6 z-10 max-w-3xl items-center">
      <div class="flex items-center justify-center gap-4 text-accent/80">
        <span class="h-px w-8 bg-accent/50"></span>
        <h2 class="text-lg font-medium tracking-wide">Olá, eu sou</h2>
        <span class="h-px w-8 bg-accent/50"></span>
      </div>
      <div class="relative">
        <h1 class="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
          {{ currentName }}<span class="text-accent">_</span>
        </h1>
        <button
          class="absolute -right-20 top-0 md:-right-16 md:top-4 md:bottom-auto rotate-6 md:rotate-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          @click="toggleName"
        >
          <div
            class="bg-card-dark border border-card-border px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2"
          >
            <Icon
              icon="material-symbols:sync"
              class="text-accent text-sm transition-transform duration-500"
              :style="{ transform: `rotate(${rotationIcon}deg)` }"
            />

            <span class="text-xs font-mono text-gray-400 whitespace-nowrap">
              aka <span class="text-white font-bold">{{ otherName }}</span>
            </span>
          </div>
        </button>
      </div>
      <div
        class="mt-4 flex items-center justify-center gap-3 text-2xl md:text-4xl font-bold text-gray-400 tracking-tight"
      >
        <span>Dev</span>
        <span class="text-accent">{{ role }}</span>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mt-6">
        <a
          class="flex items-center justify-center rounded-lg bg-primary text-white h-12 px-8 text-base font-bold tracking-wide transition-all hover:bg-[#2a648f] hover:shadow-neon"
          href="#projetos"
        >
          Ver Projetos
        </a>
        <a
          class="flex items-center justify-center rounded-lg border border-gray-600 text-gray-300 h-12 px-8 text-base font-bold tracking-wide transition-all hover:border-accent hover:text-accent"
          href="#contato"
        >
          Contato
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, #2a3741 1px, transparent 1px),
    linear-gradient(to bottom, #2a3741 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}
</style>
