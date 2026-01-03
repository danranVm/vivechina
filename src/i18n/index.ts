import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import es from './locales/es.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'es',
  fallbackLocale: 'es',
  messages: {
    zh,
    es
  }
})

export default i18n

