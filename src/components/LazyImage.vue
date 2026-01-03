<template>
  <img
    ref="imgRef"
    :src="imageSrc"
    :alt="alt"
    :class="['lazy-image', { 'loaded': loaded }]"
    @load="onLoad"
    @error="onError"
    loading="lazy"
    :decoding="decoding"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt: string
  placeholder?: string
  decoding?: 'async' | 'auto' | 'sync'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  decoding: 'async'
})

const imgRef = ref<HTMLImageElement | null>(null)
const loaded = ref(false)
const error = ref(false)
const inView = ref(false)
let observer: IntersectionObserver | null = null

const imageSrc = computed(() => {
  if (error.value) {
    return props.placeholder
  }
  return inView.value ? props.src : props.placeholder
})

const onLoad = () => {
  loaded.value = true
}

const onError = () => {
  error.value = true
  loaded.value = false
}

onMounted(() => {
  if (!imgRef.value) return

  // 使用 Intersection Observer 实现懒加载
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inView.value = true
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px'
    }
  )

  observer.observe(imgRef.value)
})

onUnmounted(() => {
  if (observer && imgRef.value) {
    observer.unobserve(imgRef.value)
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.3s ease;
}

.lazy-image.loaded {
  opacity: 1;
}
</style>

