<script setup lang="ts">
defineProps<{
  path: string
}>()
</script>

<template>
  <header class="mb-8 flex items-end gap-6">
    <div>
      <p class="mb-2 font-mono text-xs text-accent">
        <span class="text-fg-subtle">~/</span>{{ path }}
      </p>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-fg">
        <slot />
      </h2>
    </div>
    <div class="mb-3 hidden h-px flex-1 bg-card-border sm:block"></div>
  </header>
</template>
