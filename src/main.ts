import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'

// 初始化 HTML lang 属性
const savedLocale = localStorage.getItem('locale') || 'es'
const htmlLang = savedLocale === 'zh' ? 'zh-CN' : 'es'
document.documentElement.lang = htmlLang

const app = createApp(App)
app.use(i18n)
app.mount('#app')
