module.exports = {
  title: 'FerrisGo',
  description: 'Just playing around.',
  lang: 'utf-8',
  plugins: [
    '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top',          // 返回顶部插件
    '@vuepress/medium-zoom',          // 图片预览插件
    '@vuepress/nprogress',        //页面顶部进度条
  ],
  themeConfig: {
    // nav: [
    //   {
    //     text: 'Introduction',
    //     link: '/'
    //   },
    //   {
    //     text: 'deeper',
    //     items: [
    //       { text: 'lifecycle', link: 'deeper/lifecycle.md' },
    //       { text: 'effective', link: 'deeper/effective.md' }
    //     ]
    //   }
    // ],
    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是FerrisGo', link: '/' },
          { text: '基础', link: '/Introduction/index.md' }
        ]
      },
      {
        text: '深入了解',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '简介', link: 'deeper/index.md' },
          { text: '生命周期', link: 'deeper/lifecycle.md' },
          { text: '响应式系统', link: 'deeper/effective.md' }
        ]
      },
    ],
  }
}