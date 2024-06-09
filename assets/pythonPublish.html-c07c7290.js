import{_ as t,r as p,o as i,c as l,a as n,b as s,d as o,e as a}from"./app-410d86ed.js";const c={},u=n("h1",{id:"python应用打包发布",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python应用打包发布","aria-hidden":"true"},"#"),s(" Python应用打包发布")],-1),r=a(`<li><p>注册Pypi账号</p></li><li><p>安装build（建议在虚拟环境中安装）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> .venv/bin/activate
pip <span class="token function">install</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装twine（建议在虚拟环境中安装）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> twine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>确定项目结构</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>packaging_tutorial/
├── LICENSE
├── pyproject.toml
├── README.md
├── src/
│   └── example/
│       ├── __init__.py
│       └── example.py
└── tests/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,4),d={href:"https://choosealicense.com/",target:"_blank",rel:"noopener noreferrer"},k=a(`<li><p>编写<code>pyproject.toml</code>项目配置文件</p><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">project</span><span class="token punctuation">]</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span>
<span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span>
<span class="token key property">authors</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token key property">name</span><span class="token punctuation">=</span><span class="token string">&quot;XXX&quot;</span><span class="token punctuation">,</span> <span class="token key property">email</span><span class="token punctuation">=</span><span class="token string">&quot;XXX&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token key property">description</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span>
<span class="token key property">readme</span> <span class="token punctuation">=</span> <span class="token string">&quot;README.md&quot;</span>
<span class="token key property">license</span> <span class="token punctuation">=</span> <span class="token punctuation">{</span> <span class="token key property">text</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span> <span class="token punctuation">}</span>
<span class="token key property">requires-python</span> <span class="token punctuation">=</span> <span class="token string">&quot;&gt;=3.10, &lt;4.0&quot;</span>  <span class="token comment"># 项目支持的python版本</span>
<span class="token key property">dependencies</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token comment"># 填写项目依赖信息</span>
<span class="token punctuation">]</span>
<span class="token key property">classifiers</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>
  <span class="token comment"># 标签信息，可以在https://pypi.org/classifiers/拷贝响应信息</span>
<span class="token punctuation">]</span>

<span class="token punctuation">[</span><span class="token table class-name">tool.setuptools</span><span class="token punctuation">]</span>
<span class="token key property">include-package-data</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>

<span class="token punctuation">[</span><span class="token table class-name">tool.setuptools.packages.find</span><span class="token punctuation">]</span>
<span class="token key property">where</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;src&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 打包src目录下</span>
<span class="token key property">include</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;example&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 将被打包进去的项目文件夹名称ABC</span>


<span class="token punctuation">[</span><span class="token table class-name">tool.setuptools.package-data</span><span class="token punctuation">]</span>
<span class="token key property">example</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;res&quot;</span><span class="token punctuation">]</span>  <span class="token comment"># 打包example项目下的res资源文件</span>

<span class="token punctuation">[</span><span class="token table class-name">build-system</span><span class="token punctuation">]</span>
<span class="token key property">requires</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;setuptools &gt;= 65.6.3&quot;</span><span class="token punctuation">]</span>
<span class="token key property">build-backend</span> <span class="token punctuation">=</span> <span class="token string">&quot;setuptools.build_meta&quot;</span>

<span class="token punctuation">[</span><span class="token table class-name">project.urls</span><span class="token punctuation">]</span>
<span class="token key property">&quot;Homepage&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span>
<span class="token key property">&quot;Bug Tracker&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;XXX&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>编译</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python <span class="token parameter variable">-m</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>发布</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python <span class="token parameter variable">-m</span> twine upload <span class="token parameter variable">--repository</span> pypi dist/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,3);function v(m,b){const e=p("ExternalLinkIcon");return i(),l("div",null,[u,n("ol",null,[r,n("li",null,[n("p",null,[s("选择开源协议，将协议内容填到LICENSE文件中"),n("a",d,[s("choosealicense"),o(e)])])]),k])])}const g=t(c,[["render",v],["__file","pythonPublish.html.vue"]]);export{g as default};
