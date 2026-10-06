<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'

interface AnimatedContentProps {
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  delay?: number
  threshold?: number
}

const props = withDefaults(defineProps<AnimatedContentProps>(), {
  distance: 100,
  direction: 'horizontal',
  reverse: false,
  duration: 0.8,
  delay: 0,
  threshold: 0.1,
})

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

// 'idle' = renderizado normalmente (SSR, sem JS, ou já visível ao carregar)
const state = ref<'idle' | 'hidden' | 'shown'>('idle')
let observer: IntersectionObserver | undefined

const style = computed(() => {
  if (state.value === 'idle') return undefined

  const offset = props.reverse ? -props.distance : props.distance
  const translate =
    props.direction === 'horizontal' ? `translateX(${offset}px)` : `translateY(${offset}px)`

  if (state.value === 'hidden') return { opacity: 0, transform: translate }

  // Equivalente ao power3.out do GSAP
  const easing = `${props.duration}s cubic-bezier(0.215, 0.61, 0.355, 1) ${props.delay}s`
  return { opacity: 1, transform: 'none', transition: `opacity ${easing}, transform ${easing}` }
})

onMounted(() => {
  const el = containerRef.value
  if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return

  // Se já está na tela, não esconde o que o usuário já está vendo
  const triggerLine = window.innerHeight * (1 - props.threshold)
  if (el.getBoundingClientRect().top < triggerLine) return

  state.value = 'hidden'
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      state.value = 'shown'
      observer?.disconnect()
    },
    { rootMargin: `0px 0px -${props.threshold * 100}% 0px` },
  )
  observer.observe(el)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="containerRef" :style="style">
    <slot />
  </div>
</template>
