import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from "@vuepress/bundler-vite";


export default defineUserConfig({
    lang: "zh-CN",
    title: "reine's blog",
    description: "VuePress Blog, 记录编程技巧",
    base: "/",
    host: "0.0.0.0",
    port: 8080,
    head: [["link", { rel: "icon", href: "https://avatars.githubusercontent.com/u/46278371?v=4" }]],
    theme: recoTheme({
        docsDir: '/docs',
        style: "@vuepress-reco/style-default",
        author: "reine-ishyanami",
        repo: 'reine-ishyanami/article',
        authorAvatar: "https://avatars.githubusercontent.com/u/46278371?v=4",
        docsRepo: "https://github.com/reine-ishyanami/article",
        docsBranch: "master",
        lastUpdatedText: "",
        // 自动设置分类
        autoSetBlogCategories: true,
        // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
        autoAddCategoryToNavbar: true,
        bulletin: {
            body: [
                {
                    type: 'text',
                    content: '如果文章教程中有误，欢迎进入右上方Github地址，在Issues中提出。',
                    style: 'font-size: 12px;'
                }
            ]
        }
    }),
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
})