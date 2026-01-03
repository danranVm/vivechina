<template>
  <section class="eventos-realizados section" aria-labelledby="eventos-realizados-title">
    <div class="container">
      <h2 id="eventos-realizados-title" class="section-title">{{ $t('eventosRealizados.title') }}</h2>
      <div class="cities-grid">
        <div
          v-for="city in cities"
          :key="city"
          class="city-card"
          role="article"
          :aria-label="$t('eventosRealizados.eventInCity', { city })"
        >
          <LazyImage
            :src="getImagePath(`/images/cities/${getCitySlug(city)}.jpg`)"
            :alt="$t('eventosRealizados.eventPhoto', { city })"
            :placeholder="getImagePath(`/images/cities/${getCitySlug(city)}-placeholder.jpg`)"
          />
          <div class="city-overlay">
            <h3 class="city-name">{{ city }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LazyImage from './LazyImage.vue'
import { getImagePath } from '../utils/imagePath'

const { tm } = useI18n()

const cities = computed(() => {
  return tm('eventosRealizados.cities') as string[]
})

const getCitySlug = (city: string) => {
  return city.toLowerCase().replace(/\s+/g, '-').replace("'", '')
}
</script>

<style scoped>
.eventos-realizados {
  background: white;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.city-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.city-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.city-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.city-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1.5rem;
  color: white;
}

.city-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .cities-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>

