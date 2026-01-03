<template>
  <section id="eventos" class="eventos section" aria-labelledby="eventos-title">
    <div class="container">
      <h2 id="eventos-title" class="section-title">{{ $t('eventos.title') }}</h2>
      <div class="eventos-grid">
        <article
          v-for="evento in eventos"
          :key="evento.id"
          class="evento-card"
          role="article"
          :aria-labelledby="`evento-${evento.id}-title`"
        >
          <div class="evento-image">
            <Carousel
              v-if="evento.images && evento.images.length > 1"
              :items="evento.images"
              :autoplay="true"
              :interval="3000"
              :show-indicators="true"
              :aria-label="evento.title"
            />
            <LazyImage
              v-else
              :src="evento.image"
              :alt="evento.title"
              :placeholder="evento.placeholder"
            />
          </div>
          <div class="evento-content">
            <h3 :id="`evento-${evento.id}-title`" class="evento-title">
              {{ evento.title }}
            </h3>
            <p class="evento-description">{{ evento.description }}</p>
            <div class="evento-meta">
              <span class="evento-date" :aria-label="$t('eventos.eventDate')">
                📅 {{ evento.date }}
              </span>
              <span class="evento-location" :aria-label="$t('eventos.eventLocation')">
                📍 {{ evento.location }}
              </span>
            </div>
            <a
              :href="evento.link"
              class="evento-link"
              :aria-label="$t('eventos.learnMoreAbout', { title: evento.title })"
            >
              {{ $t('eventos.learnMore') }} →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LazyImage from './LazyImage.vue'
import Carousel from './Carousel.vue'

const { t, tm } = useI18n()

const eventos = computed(() => {
  const events = tm('eventos.events') as Array<{
    title: string
    description: string
    date: string
    location: string
  }>
  
  // 为每个活动准备多张图片用于轮播
  const eventImagesData = [
    {
      image: '/images/events/stage-area.jpg',
      placeholder: '/images/events/booth-area.jpg',
      images: [
        { src: '/images/exhibition/stage-area.jpg', alt: t('eventos.eventStage') },
        { src: '/images/exhibition/stage-aerial-view.jpg', alt: t('eventos.eventStageAerial') },
        { src: '/images/exhibition/playground-castle.jpg', alt: t('eventos.eventPlayground') }
      ]
    },
    {
      image: '/images/events/opera-mask.jpg',
      placeholder: '/images/events/butterfly.jpg',
      images: [
        { src: '/images/lanterns/opera-mask.jpg', alt: t('eventos.eventMask') },
        { src: '/images/lanterns/opera-mask-1.jpg', alt: t('eventos.eventMask1') },
        { src: '/images/lanterns/opera-mask-2.jpg', alt: t('eventos.eventMask2') },
        { src: '/images/lanterns/opera-mask-3.jpg', alt: t('eventos.eventMask3') }
      ]
    },
    {
      image: '/images/events/panda.jpg',
      placeholder: '/images/events/lotus.jpg',
      images: [
        { src: '/images/lanterns/panda.jpg', alt: t('eventos.eventPanda') },
        { src: '/images/lanterns/panda-1.jpg', alt: t('eventos.eventPanda1') },
        { src: '/images/lanterns/animal-world.jpg', alt: t('eventos.eventAnimal') }
      ]
    }
  ]
  
  return events.map((event, index) => ({
    id: index + 1,
    title: event.title,
    description: event.description,
    date: event.date,
    location: event.location,
    image: eventImagesData[index]?.image || `/images/events/evento-${index + 1}.jpg`,
    placeholder: eventImagesData[index]?.placeholder || `/images/events/evento-${index + 1}-placeholder.jpg`,
    images: eventImagesData[index]?.images,
    link: '#entradas'
  }))
})
</script>

<style scoped>
.section {
  padding: 2rem 0;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 2px;
}

.eventos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.evento-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.evento-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.evento-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.evento-image :deep(.carousel) {
  height: 100%;
}

.evento-image :deep(.carousel-container) {
  height: 100%;
  aspect-ratio: auto;
}

.evento-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.evento-card:hover .evento-image img {
  transform: scale(1.05);
}

.evento-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.evento-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.evento-description {
  color: var(--text-light);
  margin-bottom: 1rem;
  flex: 1;
  line-height: 1.6;
}

.evento-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.evento-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.evento-link:hover,
.evento-link:focus {
  color: #b71c1c;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .eventos-grid {
    grid-template-columns: 1fr;
  }
}
</style>

