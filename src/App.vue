<script setup lang="ts">
import { useHead } from '@unhead/vue'
import fontLatin from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'
import TopBar from './components/TopBar.vue'
import MainSection from './components/MainSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ProjectSection from './components/ProjectSection.vue'
import FooterContact from './components/FooterContact.vue'

// Baixa a fonte junto com o CSS, em vez de só depois de o CSS ser lido
useHead({
  link: [{ rel: 'preload', href: fontLatin, as: 'font', type: 'font/woff2', crossorigin: '' }],
})
</script>

<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col bg-background overflow-x-hidden"
  >
    <TopBar />

    <main>
      <MainSection />
      <AboutSection />
      <TechSection />
      <ProjectSection />
    </main>
    <FooterContact />
  </div>
</template>
