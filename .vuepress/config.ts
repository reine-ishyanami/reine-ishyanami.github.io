import { defineUserConfig } from 'vuepress';
import recoTheme from "vuepress-theme-reco";


export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Blog',
    description: 'VuePress Blog, 写点小玩意',
    base: '/blog/',
    host: '0.0.0.0',
    port: 8080,
    head: [],
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        logo: "/logo.png",
        author: "reine-ishyanami",
        authorAvatar: "https://avatars.githubusercontent.com/u/46278371?v=4",
        docsRepo: "https://github.com/reine-ishyanami/vuepress-docs",
        docsBranch: "master",
        lastUpdatedText: "",
        // series 为原 sidebar
        series: {
            "/docs/theme-reco/": [
                {
                    text: "module one",
                    children: ["home", "theme"],
                },
                {
                    text: "module two",
                    children: ["api", "plugin"],
                },
            ],
        },
        navbar: [
            { text: "Home", link: "/" },
            { text: "Categories", link: "/categories/java/1/" },
            { text: "Tags", link: "/tags/Java/1/" }
        ]
    }),
})