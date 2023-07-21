import {defaultTheme, defineUserConfig} from 'vuepress';

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'VuePress',
    description: 'VuePress测试项目',
    base: '/vuepress-docs/',
    host: '0.0.0.0',
    port: 8080,
    head: [],
    theme: defaultTheme({
        docsBranch: 'master',
        repo: 'reine-ishyanami/vuepress-docs',
        navbar: [],
        sidebar: [
            {
                text: 'Java模块化',
                link: '/java/Java模块化.md'
            }, {
                text: 'GraalVM native-image编译',
                link: '/java/GraalVM native-image编译.md'
            }, {
                text: '控制台输出带颜色的字体',
                link: '/java/控制台输出带颜色的字体.md'
            }, {
                text: 'Python应用打包发布',
                link: '/python/Python应用打包发布.md'
            }, {
                text: 'FFmpeg',
                link: '/other/FFmpeg.md'
            }
        ]
    })
})