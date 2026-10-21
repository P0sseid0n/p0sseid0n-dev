<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, useTemplateRef } from 'vue'
import IconFingerprint from '~icons/material-symbols/fingerprint'
import IconVerified from '~icons/material-symbols/verified'
import AnimationScroll from './AnimationScroll.vue'
import SectionTitle from './SectionTitle.vue'
import { prefersReducedMotion } from '@/utils/motion'

type DiffResult = {
  years: number
  months: number
}

function diffYearsMonths(startDate: Date | string, onlyYears: true): number
function diffYearsMonths(startDate: Date | string, onlyYears?: false): DiffResult
function diffYearsMonths(startDate: Date | string, onlyYears = false) {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  if (now.getDate() < start.getDate()) {
    months--
    if (months < 0) {
      years--
      months = 11
    }
  }

  return onlyYears ? years : { years, months }
}

const age = diffYearsMonths('2004-10-01', true)
const experience = diffYearsMonths('2022-04-25', false)

// Cada palavra-chave do card, ligada à palavra do texto que a origina
const tags = [
  { label: 'frontend', match: 'front-end' },
  { label: 'backend', match: 'back-end' },
  { label: 'fullstack', match: 'full stack' },
  { label: 'typescript', match: 'TypeScript' },
  { label: 'python', match: 'Python' },
]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Chama o callback uma vez quando o elemento cruza a área do observer
function onceVisible(el: Element, callback: () => void, options?: IntersectionObserverInit) {
  if (!('IntersectionObserver' in window)) {
    callback()
    return
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer.disconnect()
    callback()
  }, options)
  observer.observe(el)
  observers.push(observer)
}

const observers: IntersectionObserver[] = []
let reducedMotion = false

/*
 * Texto em palavras: cada uma acende conforme a rolagem (CSS, animation-timeline)
 * e as palavras-chave em negrito se "decodificam" ao cruzar a tela (JS).
 * O tempo de experiência vira um badge de vidro com um ponto "no ar".
 */
type Kind = 'word' | 'keyword' | 'badge'
type Segment = { text: string; kind?: Kind }
type Token = { text: string; kind: Kind; progress: number; key: number; tag?: number }

const paragraphs: Segment[][] = [
  [
    {
      text: `Me chamo Matheus Possidonio, tenho ${age} anos, sou do Rio de Janeiro, Brasil. Sou desenvolvedor `,
    },
    { text: 'full stack', kind: 'keyword' },
    { text: ', atualmente trabalhando com ' },
    { text: 'front-end', kind: 'keyword' },
    { text: ', com forte domínio de ' },
    { text: 'TypeScript', kind: 'keyword' },
    { text: ', ' },
    {
      text: `${experience.years} ${experience.years === 1 ? 'ano' : 'anos'} e ${experience.months} ${experience.months === 1 ? 'mês' : 'meses'}`,
      kind: 'badge',
    },
    { text: ' de experiência profissional.' },
  ],
  [
    { text: 'Minha especialidade é o ecossistema ' },
    { text: 'JavaScript', kind: 'keyword' },
    {
      text: ', mas minha curiosidade não tem fronteiras. Gosto de problemas que exigem lógica de ',
    },
    { text: 'back-end', kind: 'keyword' },
    { text: ', sensibilidade de design no ' },
    { text: 'front-end', kind: 'keyword' },
    { text: ' e também aplico conhecimentos em ' },
    { text: 'Python', kind: 'keyword' },
    { text: '.' },
  ],
]

// Cada palavra leva o espaço seguinte junto, para o texto quebrar linha normalmente
const tokenParagraphs: Token[][] = paragraphs.map((segments) =>
  segments.flatMap((segment): Token[] =>
    segment.kind
      ? [{ text: segment.text, kind: segment.kind, progress: 0, key: 0 }]
      : [...segment.text.matchAll(/\S+\s*|\s+/g)].map((match) => ({
          text: match[0],
          kind: 'word',
          progress: 0,
          key: 0,
        })),
  ),
)
const allTokens = tokenParagraphs.flat()
allTokens.forEach((token, i) => {
  token.key = i
  token.progress = i / allTokens.length
  const tag = tags.findIndex((t) => t.match === token.text)
  if (token.kind === 'keyword' && tag !== -1) token.tag = tag
})

// O que aparece em cada palavra-chave; no HTML gerado é o texto final
const scrambled = reactive<Record<number, string>>({})
const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

async function decode(token: Token) {
  if (reducedMotion) return
  const final = token.text
  const steps = final.length * 3
  for (let step = 0; step <= steps; step++) {
    const revealed = Math.floor((step / steps) * final.length)
    scrambled[token.key] = [...final]
      .map((char, i) =>
        i < revealed || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      )
      .join('')
    await sleep(40)
  }
  delete scrambled[token.key]
}

/*
 * Badge da experiência: mostra anos e meses; no hover um tooltip traz o tempo completo, ao vivo.
 */
const CAREER_START = new Date('2022-04-25T00:00:00-03:00')
type Uptime = { years: number; months: number; days?: number; ms?: number }
const uptime = ref<Uptime>(experience)

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}

const uptimeShort = computed(
  () =>
    `${plural(uptime.value.years, 'ano', 'anos')} e ${plural(uptime.value.months, 'mês', 'meses')}`,
)
const uptimeFull = computed(() => {
  const { years, months, days, ms } = uptime.value
  if (days === undefined || ms === undefined) return undefined
  const totalSeconds = Math.floor(ms / 1000)
  const clock = [
    Math.floor(totalSeconds / 3600),
    Math.floor(totalSeconds / 60) % 60,
    totalSeconds % 60,
  ]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
  const date = [
    plural(years, 'ano', 'anos'),
    plural(months, 'mês', 'meses'),
    plural(days, 'dia', 'dias'),
  ]
  return { date: date.join(', '), clock }
})

// Anos e meses de calendário, depois dias e o resto do dia em ms
function elapsed(from: Date, to: Date): Uptime {
  const anchor = new Date(from)
  let years = 0
  let months = 0
  const step = (unit: 'year' | 'month') => {
    const next = new Date(anchor)
    if (unit === 'year') next.setFullYear(next.getFullYear() + 1)
    else next.setMonth(next.getMonth() + 1)
    if (next > to) return false
    anchor.setTime(next.getTime())
    return true
  }
  while (step('year')) years++
  while (step('month')) months++
  const rest = to.getTime() - anchor.getTime()
  const DAY = 86_400_000
  return { years, months, days: Math.floor(rest / DAY), ms: rest % DAY }
}

// O relógio só roda com o tooltip aberto; ao fechar, o texto fica para o fade de saída
let uptimeTimer: ReturnType<typeof setInterval> | undefined

function startUptime() {
  const tick = () => (uptime.value = elapsed(CAREER_START, new Date()))
  tick()
  clearInterval(uptimeTimer)
  uptimeTimer = setInterval(tick, 1000)
}

function stopUptime() {
  clearInterval(uptimeTimer)
}

const keywordEls = new Map<number, Element>()
function setKeywordEl(key: number, el: unknown) {
  if (el instanceof Element) keywordEls.set(key, el)
}

/*
 * Palavras-chave do card: cada uma "voa" da palavra do texto até a linha quando termina de
 * decodificar, e o hover liga a cápsula às palavras do texto (e vice-versa).
 */
const tagsRowRef = useTemplateRef<HTMLElement>('tagsRowRef')
const tagEls: HTMLElement[] = []
function setTagEl(i: number, el: unknown) {
  if (el instanceof HTMLElement) tagEls[i] = el
}

// No HTML gerado todas aparecem; ao montar, as que ainda vão voar ficam escondidas
const landed = reactive(tags.map(() => true))
const activeTag = ref<number>()
const flying = new Set<number>()
const pendingFlights: { token: Token; tag: number }[] = []
let tagsRowVisible = false

function queueFlight(token: Token) {
  const tag = token.tag
  // "front-end" aparece duas vezes no texto: só a primeira voa
  if (tag === undefined || landed[tag] || flying.has(tag)) return
  flying.add(tag)
  // Se a linha ainda está fora da tela, o voo espera ela aparecer para ser visto
  if (tagsRowVisible) fly(token, tag)
  else pendingFlights.push({ token, tag })
}

function flushFlights() {
  pendingFlights.splice(0).forEach(({ token, tag }, i) => {
    setTimeout(() => fly(token, tag), i * 140)
  })
}

function fly(token: Token, tag: number) {
  const source = keywordEls.get(token.key)
  const target = tagEls[tag]
  if (!source || !target) {
    landed[tag] = true
    return
  }
  const from = source.getBoundingClientRect()
  const to = target.getBoundingClientRect()

  // Cópia da cápsula presa à tela, que sai da palavra e pousa no lugar da cápsula. Ela vai
  // direto no body, fora da lista: sem o list-style none o <li> ganharia o marcador de lista
  const clone = target.cloneNode(true) as HTMLElement
  clone.classList.remove('tag-pending')
  clone.setAttribute('aria-hidden', 'true')
  Object.assign(clone.style, {
    listStyle: 'none',
    whiteSpace: 'nowrap',
    position: 'fixed',
    left: `${to.left}px`,
    top: `${to.top}px`,
    width: `${to.width}px`,
    height: `${to.height}px`,
    margin: '0',
    zIndex: '60',
    pointerEvents: 'none',
  })
  document.body.appendChild(clone)

  const dx = from.left + from.width / 2 - (to.left + to.width / 2)
  const dy = from.top + from.height / 2 - (to.top + to.height / 2)
  const flight = clone.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(0.8)`, opacity: 0 },
      {
        transform: `translate(${dx / 2}px, ${dy / 2 - 48}px) scale(1.05)`,
        opacity: 1,
        offset: 0.5,
      },
      { transform: 'none', opacity: 1 },
    ],
    { duration: 750, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
  )
  flight.finished.finally(() => {
    clone.remove()
    landed[tag] = true
    flying.delete(tag)
  })
}

/*
 * Digital: uma linha de scanner passa por ela e, no fim, o selo é digitado.
 */
const cardRef = useTemplateRef<HTMLElement>('cardRef')
const scan = ref<'idle' | 'scanning' | 'done'>('idle')
const SEAL = 'identidade verificada'
const sealText = ref('')

async function startScan() {
  if (reducedMotion) {
    scan.value = 'done'
    sealText.value = SEAL
    return
  }
  scan.value = 'scanning'
  await sleep(1700)
  scan.value = 'done'
  for (const char of SEAL) {
    sealText.value += char
    await sleep(35 + Math.random() * 45)
  }
}

onMounted(() => {
  reducedMotion = prefersReducedMotion()

  if (!reducedMotion) {
    landed.fill(false)
    if (tagsRowRef.value && 'IntersectionObserver' in window) {
      const rowObserver = new IntersectionObserver(([entry]) => {
        tagsRowVisible = entry?.isIntersecting ?? false
        if (tagsRowVisible) flushFlights()
      })
      rowObserver.observe(tagsRowRef.value)
      observers.push(rowObserver)
    } else {
      tagsRowVisible = true
    }
  }

  // Decodifica quando a palavra passa da linha a 60% da altura da tela; depois ela voa
  const started = new Set<number>()
  const reveal = (token: Token) => {
    if (started.has(token.key)) return
    started.add(token.key)
    decode(token).then(() => queueFlight(token))
  }
  const keywords = allTokens.filter((token) => token.kind === 'keyword')
  for (const token of keywords) {
    const el = keywordEls.get(token.key)
    if (el) onceVisible(el, () => reveal(token), { rootMargin: '0px 0px -40% 0px' })
  }
  // Com o card inteiro na tela, as últimas palavras podem nunca cruzar essa linha: quando a
  // linha de palavras-chave aparece inteira, as que faltam vão em sequência
  if (tagsRowRef.value) {
    onceVisible(
      tagsRowRef.value,
      () => {
        keywords
          .filter((token) => !started.has(token.key))
          .forEach((token, i) => setTimeout(() => reveal(token), 400 + i * 250))
      },
      { threshold: 1 },
    )
  }
  if (cardRef.value) onceVisible(cardRef.value, startScan, { threshold: 0.5 })
})

onUnmounted(() => {
  observers.forEach((observer) => observer.disconnect())
  clearInterval(uptimeTimer)
})
</script>

<template>
  <AnimationScroll>
    <section class="w-full max-w-240 mx-auto px-4 pt-16 pb-20" id="sobre">
      <SectionTitle path="sobre">Sobre mim</SectionTitle>
      <div
        ref="cardRef"
        class="rounded-2xl bg-card border border-card-border shadow-card p-6 sm:p-8 md:p-12 relative overflow-clip"
      >
        <div
          class="absolute top-[50%] -translate-y-[50%] right-0 p-12 pointer-events-none"
          aria-hidden="true"
        >
          <div class="fingerprint relative" :class="`is-${scan}`">
            <IconFingerprint class="text-[200px] text-fg opacity-[0.06] animate-soft-pulse" />
            <IconFingerprint class="fp-lit absolute inset-0 text-[200px] text-accent" />
            <span
              class="fp-line absolute inset-x-0 h-0.5 rounded-full bg-accent shadow-glow"
            ></span>
          </div>
        </div>
        <div
          class="about-text space-y-4 text-fg-muted text-base md:text-lg leading-relaxed max-w-[62ch] relative z-10 md:pr-16 [&_b]:font-semibold [&_b]:text-fg-soft"
        >
          <p v-for="(tokens, p) in tokenParagraphs" :key="p">
            <template v-for="token in tokens" :key="token.key">
              <b
                v-if="token.kind === 'keyword'"
                :ref="(el) => setKeywordEl(token.key, el)"
                class="word keyword relative whitespace-nowrap"
                :class="token.tag !== undefined && activeTag === token.tag && 'is-linked'"
                :style="{ '--p': token.progress }"
                @mouseenter="activeTag = token.tag"
                @mouseleave="activeTag = undefined"
                ><span :class="scrambled[token.key] !== undefined && 'text-transparent'">{{
                  token.text
                }}</span
                ><span
                  v-if="scrambled[token.key] !== undefined"
                  class="absolute inset-0 overflow-hidden"
                  aria-hidden="true"
                  >{{ scrambled[token.key] }}</span
                ></b
              ><span
                v-else-if="token.kind === 'badge'"
                class="word badge relative -mx-[0.1em] inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-1.5 py-px align-middle font-mono text-[0.8em] leading-normal backdrop-blur-md transition-colors duration-300"
                :style="{ '--p': token.progress }"
                tabindex="0"
                @mouseenter="startUptime"
                @mouseleave="stopUptime"
                @focus="startUptime"
                @blur="stopUptime"
                ><span class="relative flex size-2" aria-hidden="true"
                  ><span class="dot absolute inline-flex size-full animate-ping rounded-full"></span
                  ><span class="dot relative inline-flex size-2 rounded-full"></span></span
                >{{ uptimeShort
                }}<span
                  class="tooltip pointer-events-none absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 translate-y-1 flex-col items-center rounded-lg border px-3 py-2 text-xs leading-snug z-20 opacity-0 transition-[opacity,translate] duration-200"
                  aria-hidden="true"
                  ><template v-if="uptimeFull"
                    ><span class="opacity-75">{{ uptimeFull.date }}</span
                    ><span class="text-base font-semibold tabular-nums">{{
                      uptimeFull.clock
                    }}</span></template
                  ></span
                ></span
              ><span v-else class="word" :style="{ '--p': token.progress }">{{ token.text }}</span>
            </template>
          </p>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 relative z-10">
          <div
            ref="tagsRowRef"
            class="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs"
          >
            <span class="text-fg-subtle" aria-hidden="true">keywords:</span>
            <ul class="contents" aria-label="Palavras-chave">
              <li
                v-for="(tag, i) in tags"
                :key="tag.label"
                :ref="(el) => setTagEl(i, el)"
                class="tag rounded-full border px-2 py-0.5 font-mono text-xs transition-colors duration-300"
                :class="[!landed[i] && 'tag-pending', activeTag === i && 'is-linked']"
                @mouseenter="activeTag = i"
                @mouseleave="activeTag = undefined"
              >
                {{ tag.label }}
              </li>
            </ul>
            <span
              v-if="landed.includes(false)"
              class="text-accent animate-terminal-caret"
              aria-hidden="true"
              >_</span
            >
          </div>
          <p
            class="flex min-h-5 items-center gap-1.5 font-mono text-xs text-accent"
            :class="scan !== 'done' && 'invisible'"
          >
            <IconVerified class="text-base" />
            {{ sealText
            }}<span v-if="sealText.length < SEAL.length" class="animate-terminal-caret">_</span>
          </p>
        </div>
      </div>
    </section>
  </AnimationScroll>
</template>

<style scoped>
/* Só acende com a rolagem onde o navegador suporta; nos outros o texto aparece normal */
@supports (animation-timeline: view()) {
  .about-text {
    view-timeline-name: --about-text;
  }

  .word {
    animation: word-light linear both;
    animation-timeline: --about-text;
    animation-range: cover calc(4% + var(--p) * 38%) cover calc(10% + var(--p) * 38%);
  }

  .keyword {
    animation-name: keyword-light;
  }
}

@keyframes word-light {
  from {
    opacity: 0.18;
  }
  to {
    opacity: 1;
  }
}

/* A palavra-chave passa pela cor de destaque e assenta na cor normal do negrito */
@keyframes keyword-light {
  0% {
    opacity: 0.18;
  }
  50% {
    opacity: 1;
    color: var(--color-accent);
  }
  100% {
    opacity: 1;
  }
}

/* Vidro: fundo translúcido, borda clara e um brilho no topo; no hover vira a cor principal */
.badge {
  color: var(--color-fg-soft);
  /* Na fonte mono o espaço tem a largura de um caractere inteiro; aproxima as palavras */
  word-spacing: -0.25em;
  background-color: color-mix(in srgb, var(--color-fg) 3%, transparent);
  border-color: color-mix(in srgb, var(--color-fg) 7%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 5%, transparent);
}

/* :focus além do hover: no celular o toque foca o badge, e tocar fora fecha */
.badge:hover,
.badge:focus {
  color: var(--color-on-accent);
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.badge .dot {
  background-color: var(--color-accent);
  transition: background-color 0.3s;
}

.badge:hover .dot,
.badge:focus .dot {
  background-color: var(--color-on-accent);
}

.badge:hover .tooltip,
.badge:focus .tooltip {
  opacity: 1;
  translate: -50% 0;
}

/* Cápsulas no mesmo vidro do badge; ficam na cor principal no hover ou quando a palavra do texto está em foco */
.tag {
  color: var(--color-fg-soft);
  background-color: color-mix(in srgb, var(--color-fg) 3%, transparent);
  border-color: color-mix(in srgb, var(--color-fg) 7%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 5%, transparent);
}

.tag.is-linked {
  color: var(--color-on-accent);
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Ainda vai voar do texto: ocupa o lugar, mas não aparece */
.tag-pending {
  opacity: 0;
}

.keyword {
  transition: color 0.3s;
}

.keyword.is-linked {
  color: var(--color-accent);
}

/* Tooltip sólido e invertido em relação ao tema, para destacar sobre o texto */
.tooltip {
  color: var(--color-background);
  background-color: var(--color-fg);
  border-color: var(--color-fg);
  box-shadow: 0 12px 32px -12px rgb(0 0 0 / 0.5);
}

.fp-lit {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}

.fp-line {
  top: 0;
  opacity: 0;
}

.is-scanning .fp-lit {
  opacity: 0.22;
  animation: fp-reveal 1.6s ease-in-out forwards;
}

.is-scanning .fp-line {
  animation: fp-line 1.6s ease-in-out forwards;
}

.is-done .fp-lit {
  clip-path: inset(0);
  opacity: 0.1;
  transition: opacity 1s;
}

@keyframes fp-reveal {
  to {
    clip-path: inset(0);
  }
}

@keyframes fp-line {
  0% {
    top: 0;
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
