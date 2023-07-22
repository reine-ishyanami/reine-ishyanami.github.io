import {defaultTheme, defineUserConfig} from 'vuepress';

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Blog',
    description: 'VuePress Blog, 写点小玩意',
    base: '/vuepress-docs/',
    host: '0.0.0.0',
    port: 8080,
    head: [],
    theme: defaultTheme({
        docsBranch: 'master',
        repo: 'reine-ishyanami/vuepress-docs',
        home: '/',
        navbar: [],
        sidebar: [
            {
                text: '首页',
                link: '/',
                collapsible: false
            },{
                text: 'Java',
                collapsible: false,
                children: [
                    {
                        text: 'Java模块化',
                        link: '/java/Java模块化.md'
                    },
                    {
                        text: 'GraalVM native-image编译',
                        link: '/java/GraalVM native-image编译.md'
                    },
                    {
                        text: '控制台输出带颜色的字体',
                        link: '/java/控制台输出带颜色的字体.md'
                    }
                ]
            },{
                text: 'Python',
                collapsible: false,
                children: [
                    {
                        text: 'Python应用打包发布',
                        link: '/python/Python应用打包发布.md'
                    }
                ]
            },{
                text: 'Other',
                collapsible: false,
                children: [
                    {
                        text: 'FFmpeg',
                        link: '/other/FFmpeg.md'
                    },{

                        text: 'MySQL开窗函数',
                        link: '/other/MySQL开窗函数.md'
                    }
                ]
            }
        ]
    })
})