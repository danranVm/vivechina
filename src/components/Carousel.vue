<template>
  <div class="carousel" role="region" :aria-label="ariaLabel">
    <div class="carousel-container">
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel-slide"
        >
          <LazyImage
            :src="item.src"
            :alt="item.alt || `${ariaLabel} - ${index + 1}`"
            :placeholder="item.placeholder"
          />
        </div>
      </div>
    </div>
    
    <button
      v-if="showControls && items.length > 1"
      class="carousel-btn carousel-btn-prev"
      @click="prevSlide"
      :aria-label="prevLabel"
    >
      ‹
    </button>
    <button
      v-if="showControls && items.length > 1"
      class="carousel-btn carousel-btn-next"
      @click="nextSlide"
      :aria-label="nextLabel"
    >
      ›
    </button>
    
    <div v-if="showIndicators && items.length > 1" class="carousel-indicators">
      <button
        v-for="(_, index) in items"
        :key="index"
        class="carousel-indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
        :aria-label="`${ariaLabel} - ${index + 1}`"
        :aria-current="index === currentIndex ? 'true' : 'false'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LazyImage from './LazyImage.vue'

interface CarouselItem {
  src: string
  alt?: string
  placeholder?: string
}

interface CarouselItem {
  src: string
  alt?: string
  placeholder?: string
}

interface Props {
  items: CarouselItem[]
  autoplay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
  ariaLabel?: string
  prevLabel?: string
  nextLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  interval: 5000,
  showControls: true,
  showIndicators: true,
  ariaLabel: '轮播图',
  prevLabel: '上一张',
  nextLabel: '下一张'
})

const currentIndex = ref(0)
let autoplayTimer: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
  resetAutoplay()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
  resetAutoplay()
}

const goToSlide = (index: number) => {
  currentIndex.value = index
  resetAutoplay()
}

const resetAutoplay = () => {
  if (props.autoplay) {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
    }
    startAutoplay()
  }
}

const startAutoplay = () => {
  if (props.autoplay && props.items.length > 1) {
    autoplayTimer = window.setInterval(() => {
      nextSlide()
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  if (props.autoplay) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.carousel-btn:hover,
.carousel-btn:focus {
  background: rgba(0, 0, 0, 0.8);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-btn-prev {
  left: 1rem;
}

.carousel-btn-next {
  right: 1rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-indicator:hover,
.carousel-indicator:focus {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.carousel-indicator.active {
  background: white;
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .carousel-btn-prev {
    left: 0.5rem;
  }

  .carousel-btn-next {
    right: 0.5rem;
  }

  .carousel-indicators {
    bottom: 0.5rem;
  }

  .carousel-indicator {
    width: 10px;
    height: 10px;
  }
}
</style>

