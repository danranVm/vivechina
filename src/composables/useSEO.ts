import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { SEO_CONFIG, getCurrentUrl, getHreflangCode, getLocaleUrl } from '../config/seo'

export function useSEO() {
  const { t, locale } = useI18n()

  // 创建或更新 meta 标签
  const setMetaTag = (selector: string, attribute: string, value: string, propertyName?: string) => {
    let element = document.querySelector(selector) as HTMLElement
    if (!element) {
      element = document.createElement('meta')
      if (propertyName) {
        element.setAttribute('property', propertyName)
      } else if (selector.includes('[name=')) {
        const nameMatch = selector.match(/\[name="([^"]+)"/)
        if (nameMatch && nameMatch[1]) {
          element.setAttribute('name', nameMatch[1])
        }
      }
      document.head.appendChild(element)
    }
    element.setAttribute(attribute, value)
  }

  // 创建或更新 link 标签
  const setLinkTag = (rel: string, href: string, attributes: Record<string, string> = {}) => {
    const selector = `link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ''}`
    let element = document.querySelector(selector) as HTMLLinkElement
    if (!element) {
      element = document.createElement('link')
      element.setAttribute('rel', rel)
      if (attributes.hreflang) {
        element.setAttribute('hreflang', attributes.hreflang)
      }
      document.head.appendChild(element)
    }
    element.setAttribute('href', href)
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== 'hreflang') {
        element.setAttribute(key, value)
      }
    })
  }

  const updateSEO = () => {
    const currentUrl = getCurrentUrl()
    const currentLocale = locale.value
    const hreflangCode = getHreflangCode(currentLocale)

    // 更新 HTML lang 属性
    document.documentElement.lang = hreflangCode

    // 更新 title
    document.title = t('seo.title')

    // 更新 meta description
    setMetaTag('meta[name="description"]', 'content', t('seo.description'))

    // 更新 meta keywords
    setMetaTag('meta[name="keywords"]', 'content', t('seo.keywords'))

    // 更新 Open Graph
    setMetaTag('meta[property="og:title"]', 'content', t('seo.ogTitle'), 'og:title')
    setMetaTag('meta[property="og:description"]', 'content', t('seo.ogDescription'), 'og:description')
    setMetaTag('meta[property="og:type"]', 'content', 'website', 'og:type')
    setMetaTag('meta[property="og:url"]', 'content', currentUrl, 'og:url')
    setMetaTag('meta[property="og:site_name"]', 'content', SEO_CONFIG.siteName, 'og:site_name')
    setMetaTag('meta[property="og:locale"]', 'content', currentLocale === 'zh' ? 'zh_CN' : 'es_ES', 'og:locale')
    
    // 添加多语言 alternate locales
    const alternateLocales = SEO_CONFIG.supportedLocales
      .filter(loc => loc.code !== currentLocale)
      .map(loc => ({
        code: loc.code,
        locale: loc.code === 'zh' ? 'zh_CN' : 'es_ES'
      }))
    
    // 清除旧的 alternate locale 标签
    const oldAlternates = document.querySelectorAll('meta[property="og:locale:alternate"]')
    oldAlternates.forEach(tag => tag.remove())
    
    // 创建新的 alternate locale 标签
    alternateLocales.forEach(({ locale: localeCode }) => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:locale:alternate')
      meta.setAttribute('content', localeCode)
      document.head.appendChild(meta)
    })

    // 更新 Twitter Cards
    setMetaTag('meta[property="twitter:card"]', 'content', 'summary_large_image', 'twitter:card')
    setMetaTag('meta[property="twitter:title"]', 'content', t('seo.twitterTitle'), 'twitter:title')
    setMetaTag('meta[property="twitter:description"]', 'content', t('seo.twitterDescription'), 'twitter:description')

    // 设置 canonical URL
    setLinkTag('canonical', currentUrl)

    // 设置 hreflang 标签（多语言支持）
    SEO_CONFIG.supportedLocales.forEach(({ code, lang }) => {
      setLinkTag('alternate', getLocaleUrl(code), { hreflang: lang })
    })
    // 添加 x-default
    setLinkTag('alternate', getLocaleUrl(SEO_CONFIG.defaultLocale), { hreflang: 'x-default' })

    // 更新结构化数据
    updateStructuredData()
  }

  const updateStructuredData = () => {
    const currentUrl = getCurrentUrl()
    const currentLocale = locale.value

    // 获取或创建结构化数据容器
    let schemaContainer = document.getElementById('structured-data-container')
    if (!schemaContainer) {
      schemaContainer = document.createElement('div')
      schemaContainer.id = 'structured-data-container'
      schemaContainer.style.display = 'none'
      document.body.appendChild(schemaContainer)
    }

    // 清除旧的脚本标签
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
    oldScripts.forEach(script => script.remove())

    // Event 结构化数据
    const eventSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: t('seo.schemaName'),
      description: t('seo.schemaDescription'),
      startDate: '2025-01-01',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: t('seo.schemaLocation'),
        address: {
          '@type': 'PostalAddress',
          addressCountry: currentLocale === 'zh' ? 'CN' : 'AR'
        }
      },
      organizer: {
        '@type': 'Organization',
        name: SEO_CONFIG.organization.name,
        url: SEO_CONFIG.organization.url
      },
      url: currentUrl
    }

    // Organization 结构化数据
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name,
      url: SEO_CONFIG.organization.url,
      logo: SEO_CONFIG.organization.logo,
      contactPoint: SEO_CONFIG.organization.contactPoint,
      sameAs: Object.values(SEO_CONFIG.social)
    }

    // WebSite 结构化数据
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      inLanguage: SEO_CONFIG.supportedLocales.map(loc => loc.lang),
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }

    // 将所有结构化数据添加到页面
    const schemas = [eventSchema, organizationSchema, websiteSchema]
    schemas.forEach(schema => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }

  // 监听语言变化，自动更新 SEO
  watch(locale, () => {
    updateSEO()
  }, { immediate: true })

  // 组件挂载时初始化 SEO
  onMounted(() => {
    updateSEO()
  })

  return {
    updateSEO,
    updateStructuredData
  }
}

