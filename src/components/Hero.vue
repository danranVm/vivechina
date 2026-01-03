<template>
  <section class="hero" role="banner" aria-labelledby="hero-title">
    <div class="hero-content">
      <h2 id="hero-title" class="hero-title">{{ $t('hero.title') }}</h2>
      <p class="hero-subtitle">{{ $t('hero.subtitle') }}</p>
      <div class="hero-actions">
        <a 
          href="https://www.joinnus.com/events/entertainment/arequipa-vive-china-73034" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-primary" 
          :aria-label="$t('hero.buyTicketsLabel')"
        >
          {{ $t('hero.buyTickets') }}
        </a>
        <a href="#festival" class="btn btn-secondary" :aria-label="$t('hero.learnMoreLabel')">
          {{ $t('hero.learnMore') }}
        </a>
      </div>
    </div>
    <div class="hero-image">
      <LazyImage
        src="/images/hero/aerial-view.jpg"
        :alt="$t('hero.title')"
        placeholder="/images/hero/aerial-view-1.jpg"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import LazyImage from './LazyImage.vue'
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover,
.btn-primary:focus {
  background: #b71c1c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-secondary:hover,
.btn-secondary:focus {
  background: white;
  color: var(--primary-color);
  transform: translateY(-2px);
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.3;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero {
    min-height: 70vh;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>

