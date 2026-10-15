<script setup lang="ts">
import IconFingerprint from '~icons/material-symbols/fingerprint'
import AnimationScroll from './AnimationScroll.vue'
import SectionTitle from './SectionTitle.vue'

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

const hashtags = ['FrontEnd', 'BackEnd', 'FullStack', 'TypeScript', 'Python']
</script>

<template>
  <AnimationScroll>
    <section class="w-full max-w-240 mx-auto px-4 pt-16 pb-20" id="sobre">
      <SectionTitle path="sobre">Sobre mim</SectionTitle>
      <div
        class="rounded-2xl bg-card border border-card-border shadow-card p-6 sm:p-8 md:p-12 relative overflow-hidden"
      >
        <div
          class="absolute top-[50%] -translate-y-[50%] right-0 p-12 pointer-events-none opacity-[0.06] animate-soft-pulse"
        >
          <IconFingerprint class="text-[200px] text-fg" />
        </div>
        <div
          class="space-y-4 text-fg-muted text-base md:text-lg leading-relaxed max-w-[62ch] relative z-10 md:pr-16 [&_b]:font-semibold [&_b]:text-fg-soft"
        >
          <p>
            Me chamo Matheus, tenho {{ age }} anos, sou do Rio de Janeiro, Brasil. Sou desenvolvedor
            <b>full stack</b>, atualmente trabalhando com <b>front-end</b>, com forte domínio de
            <b>TypeScript</b>, {{ experience.years }} anos e {{ experience.months }} meses de
            experiência profissional.
          </p>
          <p>
            Minha especialidade é o ecossistema <b>JavaScript</b>, mas minha curiosidade não tem
            fronteiras. Gosto de problemas que exigem lógica de <b>back-end</b>, sensibilidade de
            design no <b>front-end</b> e também aplico conhecimentos em <b>Python</b>.
          </p>
        </div>
        <ul class="mt-8 flex flex-wrap gap-2 relative z-10">
          <li
            v-for="hashtag in hashtags"
            :key="hashtag"
            class="px-2.5 py-1 rounded text-xs font-mono text-accent bg-accent/10 border border-accent/20"
          >
            #{{ hashtag }}
          </li>
        </ul>
      </div>
    </section>
  </AnimationScroll>
</template>
