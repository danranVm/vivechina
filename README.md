# ViveChina - 中国文化节庆活动宣传页

这是一个基于 Vue3 + Vite 构建的中国文化节庆活动宣传页面，参考了 tianfufestival.com 的设计和功能。

## 特性

- ✅ **Vue3 + TypeScript** - 使用最新的 Vue3 Composition API 和 TypeScript
- ✅ **国际化（i18n）** - 支持中文和西班牙语，使用 vue-i18n 实现
- ✅ **SEO 优化** - 完整的 meta 标签、结构化数据（JSON-LD）、语义化 HTML
- ✅ **无障碍性（a11y）** - 符合 WCAG 标准，支持屏幕阅读器、键盘导航
- ✅ **图片懒加载** - 使用 Intersection Observer 实现高性能图片懒加载
- ✅ **视频懒加载** - 视频内容按需加载，优化性能
- ✅ **响应式设计** - 完美适配移动端、平板和桌面端
- ✅ **现代化 UI** - 美观的界面设计和流畅的动画效果

## 技术栈

- Vue 3.5+
- TypeScript
- Vite 7+
- Vue I18n 9+ (国际化)
- CSS3 (原生 CSS，无 UI 框架)

## 项目结构

```
vivechina/
├── public/              # 静态资源
│   └── images/         # 图片资源（需要添加）
├── src/
│   ├── components/      # Vue 组件
│   │   ├── Header.vue          # 导航栏（包含语言切换器）
│   │   ├── Hero.vue            # 首页横幅
│   │   ├── Eventos.vue         # 即将到来的活动
│   │   ├── Festival.vue        # 节庆活动介绍
│   │   ├── EventosRealizados.vue # 已举办的活动
│   │   ├── Entradas.vue        # 购票区域
│   │   ├── Footer.vue          # 页脚
│   │   ├── LazyImage.vue       # 懒加载图片组件
│   │   └── LazyVideo.vue       # 懒加载视频组件
│   ├── i18n/            # 国际化配置
│   │   ├── index.ts            # i18n 初始化
│   │   └── locales/            # 语言文件
│   │       ├── zh.json         # 中文翻译
│   │       └── es.json         # 西班牙语翻译
│   ├── App.vue         # 根组件
│   ├── main.ts         # 入口文件
│   └── style.css       # 全局样式
├── index.html          # HTML 模板（包含 SEO meta 标签）
└── vite.config.ts      # Vite 配置
```

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 国际化（i18n）

项目支持中文和西班牙语两种语言：

1. **语言切换** - 在导航栏右上角可以切换语言
2. **语言持久化** - 选择的语言会保存在 localStorage 中
3. **动态 HTML lang** - 切换语言时自动更新 HTML lang 属性
4. **完整翻译** - 所有页面文案都已翻译为两种语言

### 添加新语言

1. 在 `src/i18n/locales/` 目录下创建新的语言文件（如 `en.json`）
2. 在 `src/i18n/index.ts` 中导入并添加到 messages
3. 在 Header 组件中添加语言切换按钮

## SEO 优化

项目已实现全面的 SEO 优化，包括以下内容：

### 基础 SEO

1. **Meta 标签** - 完整的 title、description、keywords、author、robots
2. **Canonical URL** - 防止重复内容，动态设置当前页面的规范 URL
3. **HTML Lang 属性** - 根据当前语言动态更新，支持搜索引擎语言识别
4. **语义化 HTML** - 使用正确的 HTML5 语义标签（header、main、footer、article 等）

### 社交媒体优化

1. **Open Graph** - Facebook 分享优化
   - og:title, og:description, og:image, og:url, og:type, og:site_name
   - og:locale 和 og:locale:alternate（多语言支持）
   - og:image:width, og:image:height, og:image:alt

2. **Twitter Cards** - Twitter 分享优化
   - twitter:card, twitter:title, twitter:description, twitter:image, twitter:image:alt

### 多语言 SEO

1. **Hreflang 标签** - 告诉搜索引擎页面的多语言版本
2. **X-Default** - 指定默认语言版本
3. **多语言 Sitemap** - sitemap.xml 中包含多语言版本信息

### 结构化数据（Schema.org）

1. **Event 结构化数据** - 事件信息（名称、描述、日期、地点、组织者）
2. **Organization 结构化数据** - 组织信息（名称、URL、Logo、联系方式、社交媒体）
3. **WebSite 结构化数据** - 网站信息（名称、URL、语言、搜索功能）

### 技术 SEO

1. **Robots.txt** - 搜索引擎爬虫指令
2. **Sitemap.xml** - 网站地图，包含所有重要页面
3. **性能优化** - DNS 预解析、预连接
4. **移动端优化** - theme-color、viewport、apple-touch-icon

### 动态 SEO 更新

- 使用 `useSEO` composable 根据当前语言动态更新所有 SEO 标签
- 语言切换时自动更新 meta 标签、结构化数据、canonical URL 等

### SEO 配置文件

所有 SEO 相关配置集中在 `src/config/seo.ts` 中，包括：
- 网站 URL 和名称
- 支持的语言列表
- 社交媒体账号
- 组织信息

### 使用环境变量

可以通过环境变量 `VITE_SITE_URL` 设置生产环境的网站 URL（用于 GitHub Pages 部署）：
```bash
VITE_SITE_URL=https://your-username.github.io/vivechina
```

## 无障碍性（a11y）

项目遵循 WCAG 2.1 标准：

- ✅ 语义化 HTML 标签
- ✅ ARIA 标签和角色
- ✅ 键盘导航支持
- ✅ 焦点可见性
- ✅ 跳过链接
- ✅ 图片 alt 文本
- ✅ 颜色对比度符合标准

## 图片资源

需要在 `public/images/` 目录下添加以下图片：

- `hero.jpg` / `hero-placeholder.jpg` - 首页横幅
- `evento-1.jpg` / `evento-1-placeholder.jpg` - 活动 1
- `evento-2.jpg` / `evento-2-placeholder.jpg` - 活动 2
- `evento-3.jpg` / `evento-3-placeholder.jpg` - 活动 3
- `gallery-*.jpg` / `gallery-*-placeholder.jpg` - 画廊图片
- `cities/*.jpg` / `cities/*-placeholder.jpg` - 城市图片

## 部署到 GitHub Pages

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署（推荐）

1. **启用 GitHub Pages**
   - 进入 GitHub 仓库的 Settings → Pages
   - 在 "Source" 中选择 "GitHub Actions"

2. **推送代码**
   - 将代码推送到 `main` 或 `master` 分支
   - GitHub Actions 会自动构建并部署

3. **访问网站**
   - 如果仓库名是 `username.github.io`，访问：`https://username.github.io`
   - 如果仓库名是其他名称（如 `vivechina`），访问：`https://username.github.io/vivechina/`

### 手动部署

如果需要手动部署：

```bash
# 设置 base 路径（如果仓库名不是 username.github.io）
export BASE_PATH=/repository-name/
# 或者对于 username.github.io 仓库使用
export BASE_PATH=/

# 构建
pnpm build

# 将 dist 目录的内容推送到 gh-pages 分支
```

### 注意事项

- 如果仓库名称不是 `username.github.io`，Vite 配置会自动使用 `/repository-name/` 作为 base 路径
- 确保在 GitHub 仓库设置中启用了 GitHub Pages
- 首次部署可能需要几分钟时间

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT
