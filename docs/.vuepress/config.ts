import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";


export default defineUserConfig({
    lang: "zh-CN",
    title: "reine's blog",
    description: "VuePress Blog, 记录编程技巧",
    base: "/",
    host: "0.0.0.0",
    port: 8080,
    head: [["link", { rel: "icon", href: "https://avatars.githubusercontent.com/u/46278371?v=4" }]],
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        author: "reine-ishyanami",
        authorAvatar: "https://avatars.githubusercontent.com/u/46278371?v=4",
        docsRepo: "https://github.com/reine-ishyanami/article",
        docsBranch: "master",
        lastUpdatedText: "",
        navbar: [
            { text: "Home", link: "/" },
            { text: "Categories", link: "/categories/java/1/" },
            { text: "Tags", link: "/tags/Java/1/" }
        ]
    }),
})