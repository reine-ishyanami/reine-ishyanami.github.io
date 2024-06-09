import{_ as e,r as t,o as i,c as o,a as n,b as s,d as p,e as l}from"./app-410d86ed.js";const c="/assets/gradleMultiMudole_01-f2890e18.png",r={},u=n("h1",{id:"gradle-多模块项目构建",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gradle-多模块项目构建","aria-hidden":"true"},"#"),s(" Gradle 多模块项目构建")],-1),d={href:"https://github.com/reine-ishyanami/article/tree/master/code/gradle-multi-module",target:"_blank",rel:"noopener noreferrer"},v=l('<ol><li><p>演示项目的目录结构</p><p><img src="'+c+`" alt="project structure"></p></li><li><p>父项目<code>gradle.properties</code>用于定义一些用在<code>build.gradle</code>中的属性</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">group</span><span class="token punctuation">=</span><span class="token value attr-value">com.reine</span>
<span class="token key attr-name">version</span><span class="token punctuation">=</span><span class="token value attr-value">0.0.1</span>
<span class="token key attr-name">springbootVersion</span><span class="token punctuation">=</span><span class="token value attr-value">3.2.1</span>
<span class="token key attr-name">springManagementVersion</span><span class="token punctuation">=</span><span class="token value attr-value">1.1.4</span>
<span class="token key attr-name">javaVersion</span><span class="token punctuation">=</span><span class="token value attr-value">21</span>
<span class="token key attr-name">r2dbcMysqlVersion</span><span class="token punctuation">=</span><span class="token value attr-value">1.0.5</span>
<span class="token key attr-name">lombokVersion</span><span class="token punctuation">=</span><span class="token value attr-value">1.18.30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>父项目<code>build.gradle</code>，用于定义一些全局配置</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>
  id <span class="token string">&#39;java&#39;</span>
  id <span class="token interpolation-string"><span class="token string">&quot;java-library&quot;</span></span>
  id <span class="token string">&#39;org.springframework.boot&#39;</span> version <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">springbootVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
  id <span class="token string">&#39;io.spring.dependency-management&#39;</span> version <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">springManagementVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// 为所有模块定义，包括自身</span>
allprojects <span class="token punctuation">{</span>
  apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;java&quot;</span></span>

  java <span class="token punctuation">{</span>
      sourceCompatibility <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">javaVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
      targetCompatibility <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">javaVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
  <span class="token punctuation">}</span>

  repositories <span class="token punctuation">{</span>
      <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>JavaCompile<span class="token punctuation">)</span><span class="token punctuation">.</span>configureEach <span class="token punctuation">{</span>
      options<span class="token punctuation">.</span>encoding <span class="token operator">=</span> <span class="token string">&#39;UTF-8&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 为所有子模块定义</span>
subprojects <span class="token punctuation">{</span>
  dependencies <span class="token punctuation">{</span>
      annotationProcessor <span class="token interpolation-string"><span class="token string">&quot;org.projectlombok:lombok:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">lombokVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
      compileOnly <span class="token interpolation-string"><span class="token string">&quot;org.projectlombok:lombok:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">lombokVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>父项目<code>setting.gradle</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>rootProject<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;gradle-multi-module&#39;</span>
include <span class="token string">&#39;producer&#39;</span>
include <span class="token string">&#39;entity&#39;</span>
include <span class="token string">&#39;consumer&#39;</span>
include <span class="token string">&#39;http&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>entity</code>模块的<code>build.gradle</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span>
apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;io.spring.dependency-management&quot;</span></span>

dependencies <span class="token punctuation">{</span>
<span class="token comment">//    starter依赖可以不引入</span>
<span class="token comment">//    implementation &#39;org.springframework.boot:spring-boot-starter&#39;</span>
  <span class="token comment">// 因为实体类上用到了r2dbc的注解，故引入此依赖</span>
  implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-data-r2dbc&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>producer</code>模块的<code>build.gradle</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span>
apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;io.spring.dependency-management&quot;</span></span>

dependencies <span class="token punctuation">{</span>
  <span class="token comment">// 依赖entity模块</span>
  <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">project</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;:entity&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//    starter依赖可以不引入</span>
<span class="token comment">//    implementation &#39;org.springframework.boot:spring-boot-starter&#39;</span>
  implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-data-r2dbc&#39;</span>
  implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-webflux&#39;</span>
  implementation <span class="token interpolation-string"><span class="token string">&quot;io.asyncer:r2dbc-mysql:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">r2dbcMysqlVersion</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>http</code>模块的<code>build.gradle</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span>
apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;io.spring.dependency-management&quot;</span></span>
apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;java-library&quot;</span></span>

dependencies <span class="token punctuation">{</span>
  <span class="token comment">// 传递依赖entity包</span>
  <span class="token function">api</span><span class="token punctuation">(</span><span class="token function">project</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;:entity&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//    starter依赖可以不引入</span>
<span class="token comment">//    implementation &#39;org.springframework.boot:spring-boot-starter&#39;</span>
  implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-webflux&#39;</span>
<span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>consumer</code>模块的<code>build.gradle</code></p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;org.springframework.boot&quot;</span></span>
apply plugin<span class="token punctuation">:</span> <span class="token interpolation-string"><span class="token string">&quot;io.spring.dependency-management&quot;</span></span>

dependencies <span class="token punctuation">{</span>
  <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">project</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;:http&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">//    starter依赖可以不引入</span>
<span class="token comment">//    implementation &#39;org.springframework.boot:spring-boot-starter&#39;</span>
  implementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-webflux&#39;</span>
  testImplementation <span class="token string">&#39;org.springframework.boot:spring-boot-starter-test&#39;</span>
<span class="token punctuation">}</span>

test<span class="token punctuation">.</span>jvmArgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token interpolation-string"><span class="token string">&quot;-XX:+EnableDynamicAgentLoading&quot;</span></span><span class="token punctuation">]</span>

tasks<span class="token punctuation">.</span><span class="token function">named</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,1);function k(m,g){const a=t("ExternalLinkIcon");return i(),o("div",null,[u,n("p",null,[n("a",d,[s("演示项目具体代码"),p(a)])]),v])}const y=e(r,[["render",k],["__file","gradleMultiModule.html.vue"]]);export{y as default};
