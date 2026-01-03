<template>
  <video
    ref="videoRef"
    :class="['lazy-video', { 'loaded': loaded }]"
    :poster="poster"
    :preload="preload"
    :controls="controls"
    :autoplay="autoplay"
    :muted="muted"
    :loop="loop"
    :playsinline="playsinline"
    @loadeddata="onLoaded"
    @error="onError"
  >
    <source v-if="src" :src="src" :type="type" />
    <track
      v-if="subtitles"
      kind="subtitles"
      :src="subtitles"
      :srclang="srclang"
      :label="label"
    />
    <p>您的浏览器不支持视频播放。</p>
  </video>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src?: string
  poster?: string
  preload?: 'none' | 'metadata' | 'auto'
  controls?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsinline?: boolean
  type?: string
  subtitles?: string
  srclang?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  preload: 'none',
  controls: true,
  autoplay: false,
  muted: false,
  loop: false,
  playsinline: true,
  type: 'video/mp4'
})

const videoRef = ref<HTMLVideoElement | null>(null)
const loaded = ref(false)
let observer: IntersectionObserver | null = null

const onLoaded = () => {
  loaded.value = true
}

const onError = () => {
  console.error('视频加载失败')
}

onMounted(() => {
  if (!videoRef.value) return

  // 使用 Intersection Observer 实现懒加载
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.value && props.src) {
          // 当视频进入视口时，设置 src 并加载
          const source = videoRef.value.querySelector('source')
          if (source && !source.src) {
            source.src = props.src
            videoRef.value.load()
          }
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px'
    }
  )

  observer.observe(videoRef.value)
})

onUnmounted(() => {
  if (observer && videoRef.value) {
    observer.unobserve(videoRef.value)
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-video {
  width: 100%;
  height: auto;
  display: block;
  background: #000;
}

.lazy-video.loaded {
  opacity: 1;
}
</style>

