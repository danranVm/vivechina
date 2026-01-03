<template>
  <div id="app">
    <a href="#main-content" class="skip-link">{{ $t('common.skipToContent') }}</a>
    <Header />
    <main id="main-content" role="main">
      <Hero />
      <Eventos />
      <Festival />
      <EventosRealizados />
      <Entradas />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Eventos from './components/Eventos.vue'
import Festival from './components/Festival.vue'
import EventosRealizados from './components/EventosRealizados.vue'
import Entradas from './components/Entradas.vue'
import Footer from './components/Footer.vue'
import { useSEO } from './composables/useSEO'

// 初始化 SEO
useSEO()
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
