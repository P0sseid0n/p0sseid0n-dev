<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import MainSection from './components/MainSection.vue'
import AboutSection from './components/AboutSection.vue'
import TechSection from './components/TechSection.vue'
import ProjectSection from './components/ProjectSection.vue'
import FooterContact from './components/FooterContact.vue'
</script>

<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors duration-200"
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

<style scoped></style>
