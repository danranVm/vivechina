<template>
  <section id="festival" class="festival section" aria-labelledby="festival-title">
    <div class="container">
      <h2 id="festival-title" class="section-title">{{ $t('festival.title') }}</h2>
      <div class="festival-content">
        <div class="festival-intro">
          <p class="intro-text">
            {{ $t('festival.intro1') }}
          </p>
          <p class="intro-text">
            {{ $t('festival.intro2') }}
          </p>
          <p class="intro-text">
            {{ $t('festival.intro3') }}
          </p>
        </div>

        <div class="festival-features">
          <article
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card"
            role="article"
            :aria-labelledby="`feature-${index}-title`"
          >
            <div class="feature-icon" :aria-hidden="true">
              {{ featureIcons[index] }}
            </div>
            <h3 :id="`feature-${index}-title`" class="feature-title">
              {{ feature.title }}
            </h3>
            <p class="feature-description">{{ feature.description }}</p>
          </article>
        </div>

        <div class="festival-gallery">
          <h3 class="gallery-title">{{ $t('festival.galleryTitle') }}</h3>
          
          <!-- 灯组照片轮播 -->
          <div class="carousel-section">
            <h4 class="carousel-section-title">{{ $t('festival.lanternsTitle') }}</h4>
            <Carousel
              :items="lanternImages"
              :autoplay="true"
              :interval="4000"
              :aria-label="$t('festival.lanternsTitle')"
              :prev-label="$t('common.prev')"
              :next-label="$t('common.next')"
            />
          </div>

          <!-- 展会照片轮播 -->
          <div class="carousel-section">
            <h4 class="carousel-section-title">{{ $t('festival.exhibitionTitle') }}</h4>
            <Carousel
              :items="exhibitionImages"
              :autoplay="true"
              :interval="4000"
              :aria-label="$t('festival.exhibitionTitle')"
              :prev-label="$t('common.prev')"
              :next-label="$t('common.next')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Carousel from './Carousel.vue'

const { t, tm } = useI18n()

const featureIcons = ['🏮', '🎭', '🍜', '🛍️']

const features = computed(() => {
  return tm('festival.features') as Array<{
    title: string
    description: string
  }>
})

// 灯组照片轮播
const lanternImages = computed(() => [
  { src: '/images/lanterns/panda.jpg', alt: t('festival.lanternPanda'), placeholder: '/images/lanterns/panda-1.jpg' },
  { src: '/images/lanterns/opera-mask.jpg', alt: t('festival.lanternMask'), placeholder: '/images/lanterns/opera-mask-1.jpg' },
  { src: '/images/lanterns/lotus.jpg', alt: t('festival.lanternLotus'), placeholder: '/images/lanterns/lotus-1.jpg' },
  { src: '/images/lanterns/butterfly.jpg', alt: t('festival.lanternButterfly'), placeholder: '/images/lanterns/butterfly-1.jpg' },
  { src: '/images/lanterns/wukong.jpg', alt: t('festival.lanternWukong'), placeholder: '/images/lanterns/wukong-1.jpg' },
  { src: '/images/lanterns/god-of-wealth.jpg', alt: t('festival.lanternWealth'), placeholder: '/images/lanterns/god-of-wealth-1.jpg' },
  { src: '/images/lanterns/dragon-tunnel.jpg', alt: t('festival.lanternDragon'), placeholder: '/images/lanterns/dragon-tunnel-1.jpg' },
  { src: '/images/lanterns/spring.jpg', alt: t('festival.lanternSpring') },
  { src: '/images/lanterns/summer.jpg', alt: t('festival.lanternSummer') },
  { src: '/images/lanterns/autumn.jpg', alt: t('festival.lanternAutumn') },
  { src: '/images/lanterns/winter.jpg', alt: t('festival.lanternWinter') }
])

// 展会照片轮播
const exhibitionImages = computed(() => [
  { src: '/images/exhibition/aerial-view.jpg', alt: t('festival.exhibitionAerial'), placeholder: '/images/exhibition/aerial-view-1.jpg' },
  { src: '/images/exhibition/stage-area.jpg', alt: t('festival.exhibitionStage') },
  { src: '/images/exhibition/booth-area.jpg', alt: t('festival.exhibitionBooth'), placeholder: '/images/exhibition/booth-area-1.jpg' },
  { src: '/images/exhibition/candied-hawthorn.jpg', alt: t('festival.exhibitionFood'), placeholder: '/images/exhibition/candied-hawthorn-1.jpg' },
  { src: '/images/exhibition/playground-castle.jpg', alt: t('festival.exhibitionPlayground') },
  { src: '/images/exhibition/daytime-aerial-view.jpg', alt: t('festival.exhibitionDaytime') },
  { src: '/images/exhibition/stage-aerial-view.jpg', alt: t('festival.exhibitionStageAerial') }
])
</script>

<style scoped>
.festival {
  background: #f8f9fa;
}

.festival-intro {
  max-width: 800px;
  margin: 0 auto 2rem;
  text-align: center;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.festival-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.feature-description {
  color: var(--text-light);
  line-height: 1.6;
}

.festival-gallery {
  margin-top: 3rem;
}

.gallery-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
}

.carousel-section {
  margin-bottom: 3rem;
}

.carousel-section-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .festival-features {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>

