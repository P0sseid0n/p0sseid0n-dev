<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Ref } from 'vue'
import IconSync from '~icons/material-symbols/sync'
import IconArrowDownward from '~icons/material-symbols/arrow-downward'
import { prefersReducedMotion } from '@/utils/motion'

const currentName = ref('P0sseid0n')
// Nome final da troca; currentName pode estar no meio da digitação
const targetName = ref('P0sseid0n')
const otherName = computed(() => (targetName.value === 'P0sseid0n' ? 'Matheus' : 'P0sseid0n'))
const rotationIcon = ref(0)

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

// Começa em Fullstack: é o que fica no HTML gerado, que buscadores e IAs leem sem rodar a animação
let roleIndex = roles.indexOf('Fullstack')
const role = ref(roles[roleIndex]!)

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Última animação iniciada para cada texto; uma nova cancela a anterior
const activeRuns = new WeakMap<Ref<string>, number>()

async function toggleText(text: string, refVar: Ref<string>) {
  const run = (activeRuns.get(refVar) ?? 0) + 1
  activeRuns.set(refVar, run)
  const cancelled = () => activeRuns.get(refVar) !== run

  if (prefersReducedMotion()) {
    refVar.value = text
    return
  }

  // Backspace segurado: o primeiro toque demora e a repetição acelera
  let eraseDelay = 140
  while (refVar.value.length > 0) {
    refVar.value = refVar.value.slice(0, -1)
    await sleep(eraseDelay)
    if (cancelled()) return
    eraseDelay = Math.max(35, eraseDelay * 0.7)
  }

  // Pausa de quem pensa antes de começar a digitar
  await sleep(250)
  if (cancelled()) return

  for (const char of text) {
    refVar.value += char
    // Ritmo irregular, e maiúsculas e números (Shift, fileira de cima) levam mais tempo
    const reach = /[A-Z0-9]/.test(char) ? 70 : 0
    await sleep(60 + Math.random() * 110 + reach)
    if (cancelled()) return
  }
}

// Enquanto o nome está sendo digitado o cursor fica aceso, como num terminal
const nameTyping = ref(false)
let nameRun = 0

async function toggleName() {
  targetName.value = otherName.value
  rotationIcon.value += 360

  const run = ++nameRun
  nameTyping.value = true
  await toggleText(targetName.value, currentName)
  if (run === nameRun) nameTyping.value = false
}

const HOLD_TIME = 4_500
let timeoutId: ReturnType<typeof setTimeout>

async function cycleRoles() {
  roleIndex = (roleIndex + 1) % roles.length
  await toggleText(roles[roleIndex]!, role)
  timeoutId = setTimeout(cycleRoles, HOLD_TIME)
}

onMounted(() => {
  if (prefersReducedMotion()) return
  timeoutId = setTimeout(cycleRoles, HOLD_TIME)
})

onUnmounted(() => {
  clearTimeout(timeoutId)
})
</script>

<template>
  <!-- Ocupa a tela toda; o pt desconta o header fixo e o pb guarda espaço para os cantos -->
  <section class="relative flex min-h-svh w-full items-center pt-24 pb-28">
    <div
      class="absolute inset-0 z-0 bg-grid-pattern opacity-20 light:opacity-60 pointer-events-none"
    ></div>
    <div
      class="relative z-10 mx-auto flex w-full max-w-240 flex-col items-center gap-6 px-4 text-center"
    >
      <div class="flex items-center gap-4 text-accent">
        <span class="h-px w-8 bg-accent/50"></span>
        <p class="font-mono text-base md:text-lg">Olá, eu sou</p>
        <span class="h-px w-8 bg-accent/50"></span>
      </div>
      <div class="relative">
        <h1
          class="text-6xl md:text-8xl lg:text-9xl font-bold text-fg leading-[0.9] tracking-[-0.045em]"
        >
          {{ currentName
          }}<span class="text-accent" :class="!nameTyping && 'animate-terminal-caret'">_</span>
        </h1>
        <button
          class="absolute -right-20 top-0 md:-right-16 md:top-4 md:bottom-auto rotate-6 md:rotate-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          type="button"
          @click="toggleName"
        >
          <div
            class="bg-card border border-card-border px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2"
          >
            <IconSync
              class="text-accent text-sm transition-transform duration-500"
              :style="{ transform: `rotate(${rotationIcon}deg)` }"
            />

            <span class="text-xs font-mono text-fg-soft whitespace-nowrap">
              aka <span class="text-fg font-bold">{{ otherName }}</span>
            </span>
          </div>
        </button>
      </div>
      <p
        class="flex items-center gap-2 text-2xl md:text-4xl font-medium text-fg-muted tracking-tight"
      >
        <span>Dev</span>
        <span class="font-semibold text-accent">{{ role }}</span>
      </p>

      <div class="flex flex-wrap justify-center gap-3 mt-6">
        <a
          class="flex items-center justify-center rounded-lg bg-accent text-on-accent h-12 px-7 text-base font-semibold transition-[background-color,box-shadow,transform] duration-200 hover:bg-accent-hover hover:shadow-glow active:scale-[0.98]"
          href="#projetos"
        >
          Ver projetos
        </a>
        <a
          class="flex items-center justify-center rounded-lg border border-border-strong text-fg-soft h-12 px-7 text-base font-semibold transition-[border-color,color,transform] duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
          href="#contato"
        >
          Contato
        </a>
      </div>
    </div>

    <div class="absolute bottom-6 left-4 z-10 text-sm md:left-8">
      <p class="font-mono text-xs text-fg-subtle">~/status</p>
      <p class="flex items-center gap-2 font-medium text-fg-soft">
        <span class="size-2 rounded-full bg-accent"></span>
        Disponível para projetos
      </p>
    </div>
    <a
      class="absolute bottom-6 right-4 z-10 flex items-center gap-1 font-mono text-xs text-fg-soft transition-colors hover:text-accent md:right-8"
      href="#sobre"
    >
      role<span class="sr-only"> até a seção Sobre</span>
      <IconArrowDownward class="animate-bounce text-base" />
    </a>
  </section>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, var(--color-card-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-card-border) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}
</style>
