/**
 * 图片路径工具函数
 * 自动处理 BASE_PATH，确保在 GitHub Pages 等子路径部署时图片能正确加载
 */

/**
 * 获取带 base path 的图片路径
 * @param path 图片路径（以 / 开头，如 '/images/logo.png'）
 * @returns 完整的图片路径（包含 base path）
 */
export function getImagePath(path: string): string {
  // import.meta.env.BASE_URL 是 Vite 提供的 base path
  // 在开发环境通常是 '/'，在生产环境是 vite.config.ts 中配置的 base
  const baseUrl = import.meta.env.BASE_URL
  // 移除 baseUrl 末尾的 /（如果存在），移除 path 开头的 /（如果存在），然后拼接
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${cleanBase}${cleanPath}`
}

/**
 * 批量获取图片路径（用于数组）
 * @param paths 图片路径数组
 * @returns 处理后的图片路径数组
 */
export function getImagePaths(paths: string[]): string[] {
  return paths.map(path => getImagePath(path))
}

