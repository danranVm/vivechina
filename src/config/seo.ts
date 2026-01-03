/**
 * SEO 配置文件
 * 用于集中管理 SEO 相关的配置信息
 */

// 网站基础信息
export const SEO_CONFIG = {
  // 网站 URL（生产环境会自动使用，开发环境使用默认值）
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://vivechina.nl',
  
  // 网站名称
  siteName: 'ViveChina',
  
  // 默认语言
  defaultLocale: 'es',
  
  // 支持的语言列表
  supportedLocales: [
    { code: 'es', lang: 'es', name: 'Español' },
    { code: 'zh', lang: 'zh-CN', name: '中文' }
  ],
  
  // 社交媒体账号
  social: {
    facebook: 'https://facebook.com/vivechina',
    instagram: 'https://instagram.com/vivechina',
    twitter: 'https://twitter.com/vivechina',
    youtube: 'https://youtube.com/@vivechina',
    tiktok: 'https://tiktok.com/@vivechina'
  },
  
  // 组织信息（用于结构化数据）
  organization: {
    name: 'ViveChina',
    url: 'https://vivechina.nl',
    logo: 'https://vivechina.nl/logo.png',
    contactPoint: {
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'Chinese']
    }
  }
} as const

/**
 * 获取当前页面的完整 URL
 */
export function getCurrentUrl(path: string = ''): string {
  if (typeof window !== 'undefined') {
    return window.location.origin + (path || window.location.pathname)
  }
  return SEO_CONFIG.siteUrl + path
}

/**
 * 获取语言的 hreflang 代码
 */
export function getHreflangCode(locale: string): string {
  const localeMap: Record<string, string> = {
    'es': 'es',
    'zh': 'zh-CN'
  }
  return localeMap[locale] || locale
}

/**
 * 获取语言的完整 URL（用于 hreflang）
 */
export function getLocaleUrl(_locale: string, path: string = '/'): string {
  // 如果使用路径前缀的方式（如 /es/, /zh/），可以在这里处理
  // 当前使用客户端切换语言，所以 URL 相同
  // _locale 参数保留用于未来可能的多语言 URL 路径支持
  return SEO_CONFIG.siteUrl + path
}

