<script setup lang="ts">
import { Icon } from '@iconify/vue'

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
  <section class="w-full px-4 py-16 scroll-mt-20" id="sobre">
    <div
      class="rounded-2xl max-w-240 mx-auto bg-card-dark border border-card-border p-8 md:p-12 relative overflow-hidden"
    >
      <div class="absolute top-[50%] -translate-y-[50%] right-0 p-12 opacity-5 pointer-events-none">
        <Icon icon="material-symbols:fingerprint" class="text-[200px] text-white" />
      </div>
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Icon icon="material-symbols:person" class="text-accent text-3xl" />
        Sobre Mim
      </h2>
      <div class="space-y-4 text-gray-400 leading-relaxed max-w-2xl relative z-10 pr-16">
        <p>
          Me chamo Matheus, tenho {{ age }} anos, sou do Rio de Janeiro, Brasil. Sou desenvolvedor
          <b>full stack</b>, atualmente focado em <b>front-end</b>, com forte domínio de
          <b>TypeScript</b>, {{ experience.years }} anos e {{ experience.months }} meses de
          experiência profissional.
        </p>
        <p>
          Minha especialidade é o ecossistema <b>JavaScript</b>, mas minha curiosidade não tem
          fronteiras. Gosto de problemas que exigem lógica de <b>back-end</b>, sensibilidade de
          design no <b>front-end</b> e também aplico conhecimentos em <b>Python</b>.
        </p>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <span
          v-for="(hashtag, i) in hashtags"
          :key="i"
          class="px-3 py-1 rounded-full text-xs font-mono bg-primary/20 text-accent border border-primary/30"
        >
          #{{ hashtag }}
        </span>
      </div>
    </div>
  </section>
</template>

<style></style>
te>

<style></style>
