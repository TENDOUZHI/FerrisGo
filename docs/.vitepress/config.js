const argv = require('minimist')(process.argv.slice(2))
const build = argv._ || false
const baseBuild = build ? '/FerrisGo/' : '/'
console.log(baseBuild);

module.exports = {
  title: 'FerrisGo',
  description: 'Just playing around.',
  lang: 'zh-CN',
  base: baseBuild,
  plugins: [
    '@vuepress/active-header-links',   // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/back-to-top',          // 返回顶部插件
    '@vuepress/medium-zoom',          // 图片预览插件
    '@vuepress/nprogress',        //页面顶部进度条
    "@vuepress/plugin-medium-zoom"

  ],
  head:[
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
  ],

  themeConfig: {
    repo: 'TENDOUZHI/FerrisGo',
    repoLabel: 'GitHub',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/TENDOUZHI/FerrisGo'
      }
    ],
    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是FerrisGo', link: '/' },
          { text: '基础', link: '/Introduction/' },
          {text: '其他',link:'/etc.md'}
        ]
      },
      {
        text: '深入了解',
        // collapsible: true,
        // collapsed: true,
        items: [
          { text: '简介', link: '/deeper/' }
        ]
      },
    ],
  }
}