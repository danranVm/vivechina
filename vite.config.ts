import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署路径配置
  // 如果是 username.github.io 仓库，base 应该是 '/'
  // 如果是其他仓库名（如 vivechina），base 应该是 '/vivechina/'
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue']
        }
      }
    },
    // 优化构建输出（使用 esbuild，Vite 默认）
    minify: 'esbuild',
    // 生成 source map（生产环境可关闭）
    sourcemap: false,
    // 优化资源大小
    chunkSizeWarningLimit: 1000
  },
  // 优化开发服务器
  server: {
    port: 3000,
    open: true
  },
  // 优化预览服务器
  preview: {
    port: 4173
  }
})
