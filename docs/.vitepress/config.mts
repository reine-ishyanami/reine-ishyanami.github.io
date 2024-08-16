import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: 'zh-cn',
  title: 'reine\'s blog',
  description: 'reine-ishyanami 的个人博客',
  base: '/',
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/46278371' }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdated: {
      text: '上次更新于'
    },

    // 设置logo
    logo: 'https://avatars.githubusercontent.com/u/46278371',
    editLink: {
      pattern:
        'https://github.com/reine-ishyanami/reine-ishyanami.github.io/blob/main/docs/:path',
      text: '去 GitHub 上编辑内容'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '项目仓库', link: 'https://github.com/reine-ishyanami/reine-ishyanami.github.io' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/reine-ishyanami'
      }
    ]
  }
})
