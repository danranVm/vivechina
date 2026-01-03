<template>
  <header class="header" role="banner">
    <nav class="nav" role="navigation" :aria-label="$t('nav.home')">
      <div class="container">
        <div class="nav-content">
          <a href="/" class="logo" :aria-label="$t('nav.home')">
            <img :src="logoPath" alt="ViveChina" class="logo-image" />
          </a>
          <button
            class="mobile-menu-toggle"
            @click="toggleMenu"
            :aria-expanded="menuOpen"
            :aria-label="$t('nav.toggleMenu')"
            aria-controls="main-menu"
          >
            <span class="hamburger" :class="{ active: menuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <ul
            id="main-menu"
            class="nav-menu"
            :class="{ active: menuOpen }"
            role="menubar"
          >
            <li role="none">
              <a
                href="#eventos"
                @click="closeMenu"
                role="menuitem"
                :aria-label="$t('nav.viewUpcomingEvents')"
              >
                {{ $t('nav.upcomingEvents') }}
              </a>
            </li>
            <li role="none">
              <a
                href="#festival"
                @click="closeMenu"
                role="menuitem"
                :aria-label="$t('nav.learnAboutFestival')"
              >
                {{ $t('nav.festival') }}
              </a>
            </li>
            <li role="none">
              <a
                href="#entradas"
                @click="closeMenu"
                role="menuitem"
                :aria-label="$t('nav.buyTickets')"
              >
                {{ $t('nav.tickets') }}
              </a>
            </li>
            <li role="none">
              <a
                href="#siguenos"
                @click="closeMenu"
                role="menuitem"
                :aria-label="$t('nav.followUsLabel')"
              >
                {{ $t('nav.followUs') }}
              </a>
            </li>
            <li role="none">
              <a
                href="#"
                @click.prevent="toggleLanguage"
                role="menuitem"
                class="lang-link"
                :aria-label="currentLocale === 'zh' ? $t('nav.switchToSpanish') : $t('nav.switchToChinese')"
              >
                {{ currentLocale === 'zh' ? $t('nav.switchToSpanish') : $t('nav.switchToChinese') }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getImagePath } from '../utils/imagePath'

const { locale } = useI18n()
const menuOpen = ref(false)

const currentLocale = computed(() => locale.value)
const logoPath = computed(() => getImagePath('/images/logo.png'))

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'zh' ? 'es' : 'zh'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  document.documentElement.lang = newLocale === 'zh' ? 'zh-CN' : 'es'
  closeMenu()
}

// 初始化语言
watch(
  () => locale.value,
  (newLocale) => {
    document.documentElement.lang = newLocale === 'zh' ? 'zh-CN' : 'es'
  },
  { immediate: true }
)
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.header:hover::before {
  opacity: 0.3;
}

.nav {
  padding: 0.75rem 0;
  transition: padding 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 64px;
  transition: transform 0.3s ease;
  z-index: 10;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-image {
  height: 100%;
  width: auto;
  max-height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}

.logo:hover .logo-image {
  filter: drop-shadow(0 4px 8px rgba(211, 47, 47, 0.2));
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  z-index: 1001;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.mobile-menu-toggle:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 26px;
  height: 20px;
  justify-content: center;
}

.hamburger span {
  display: block;
  height: 3px;
  width: 100%;
  background: var(--text-color);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
  background: var(--primary-color);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
  background: var(--primary-color);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-menu a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.5rem 0;
  display: block;
}

.nav-menu a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-menu a:hover,
.nav-menu a:focus {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.nav-menu a:hover::before,
.nav-menu a:focus::before {
  width: 100%;
}

.nav-menu a:active {
  transform: translateY(0);
}

.lang-link {
  cursor: pointer;
  position: relative;
}

.lang-link::after {
  content: '🌐';
  margin-left: 0.5rem;
  font-size: 0.9em;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.lang-link:hover::after {
  opacity: 1;
}

@media (max-width: 768px) {
  .nav {
    padding: 0.75rem 0;
    border-radius: 8px;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 60%;
    max-width: 300px;
    height: 100vh;
    max-height: 360px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    flex-direction: column;
    padding: 4.5rem 1.5rem 1.5rem;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 0.5rem;
    align-items: stretch;
    overflow-y: auto;
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-menu li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 0.25rem 0;
  }

  .nav-menu a {
    font-size: 1.15rem;
    padding: 0.25rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .nav-menu a::before {
    display: none;
  }

  .nav-menu a:hover,
  .nav-menu a:focus {
    background: rgba(211, 47, 47, 0.1);
    color: var(--primary-color);
    transform: translateX(8px);
    padding-left: 1.5rem;
  }


}

@media (min-width: 769px) {
  .nav-menu a {
    letter-spacing: 0.3px;
  }
}
</style>

