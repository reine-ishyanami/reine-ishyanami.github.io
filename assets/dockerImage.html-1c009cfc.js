import{_ as a,o as n,c as s,e}from"./app-410d86ed.js";const i={},t=e(`<h1 id="docker常用镜像启动脚本" tabindex="-1"><a class="header-anchor" href="#docker常用镜像启动脚本" aria-hidden="true">#</a> Docker常用镜像启动脚本</h1><p>下面脚本中的tag可以更换为任意版本号或者latest</p><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> MySQL</h2><ul><li>默认端口：3306</li><li>默认数据目录：/var/lib/mysql</li><li>默认配置文件目录：/etc/mysql/conf.d</li></ul><h3 id="docker启动" tabindex="-1"><a class="header-anchor" href="#docker启动" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mysql/data:/var/lib/mysql <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mysql/conf:/etc/mysql/conf.d <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
  mysql:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动" tabindex="-1"><a class="header-anchor" href="#podman启动" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mysql/data:/var/lib/mysql <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mysql/conf:/etc/mysql/conf.d <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
  docker.io/mysql:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动" tabindex="-1"><a class="header-anchor" href="#docker-compose启动" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/mysql<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>default<span class="token punctuation">-</span>authentication<span class="token punctuation">-</span>plugin=mysql_native_password
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/mysql/data<span class="token punctuation">:</span>/var/lib/mysql
      <span class="token punctuation">-</span> ~/mysql/conf<span class="token punctuation">:</span>/etc/mysql/conf.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql" aria-hidden="true">#</a> PostgreSQL</h2><ul><li>默认端口：5432</li><li>默认数据目录：/var/lib/postgresql/data</li><li>配置容器密码：POSTGRES_PASSWORD=123456</li></ul><h3 id="docker启动-1" tabindex="-1"><a class="header-anchor" href="#docker启动-1" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> postgres <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/postgres/data:/var/lib/postgresql/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
  postgres:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-1" tabindex="-1"><a class="header-anchor" href="#podman启动-1" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> postgres <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/postgres/data:/var/lib/postgresql/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
  docker.io/postgres:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-1" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-1" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">postgres</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/postgres<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5432:5432&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/postgres/data<span class="token punctuation">:</span>/var/lib/postgresql/data
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_PASSWORD=123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可用环境变量" tabindex="-1"><a class="header-anchor" href="#可用环境变量" aria-hidden="true">#</a> 可用环境变量</h3><ul><li>POSTGRES_USER: 创建数据库用户名（缺省postgres）</li><li>POSTGRES_PASSWORD: 创建数据库密码（必须）</li><li>POSTGRES_DB: 创建数据库名（缺省变量POSTGRES_USER值）</li><li>POSTGRES_INITDB_ARGS: 传递给initdb的参数（缺省）</li><li>PGDATA: 数据目录（缺省/var/lib/postgresql/data）</li></ul><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h2><ul><li>默认端口：6379</li><li>默认数据目录：/data</li><li>默认配置文件目录：/usr/local/etc/redis</li></ul><h3 id="docker启动-2" tabindex="-1"><a class="header-anchor" href="#docker启动-2" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/data:/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/conf:/usr/local/etc/redis <span class="token punctuation">\\</span>
  redis:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-2" tabindex="-1"><a class="header-anchor" href="#podman启动-2" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/data:/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/conf:/usr/local/etc/redis <span class="token punctuation">\\</span>
  docker.io/redis:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-2" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-2" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/redis<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/redis/data<span class="token punctuation">:</span>/data
      <span class="token punctuation">-</span> ~/redis/conf<span class="token punctuation">:</span>/usr/local/etc/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redisstack" tabindex="-1"><a class="header-anchor" href="#redisstack" aria-hidden="true">#</a> RedisStack</h2><ul><li>默认端口：6379</li><li>默认数据目录：/data</li><li>默认配置文件目录：/usr/local/etc/redis</li><li>默认WebUI访问端口：8001</li></ul><h3 id="docker启动-3" tabindex="-1"><a class="header-anchor" href="#docker启动-3" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> redis-stack <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">8001</span>:8001 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/data:/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/conf:/usr/local/etc/redis <span class="token punctuation">\\</span>
  redis/redis-stack:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-3" tabindex="-1"><a class="header-anchor" href="#podman启动-3" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> redis-stack <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">8001</span>:8001 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/data:/data <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/redis/conf:/usr/local/etc/redis <span class="token punctuation">\\</span>
  docker.io/redis/redis-stack:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-3" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-3" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis-stack</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/redis/redis<span class="token punctuation">-</span>stack<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>stack
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;6379:6379&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8001:8001&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/redis/data<span class="token punctuation">:</span>/data
      <span class="token punctuation">-</span> ~/redis/conf<span class="token punctuation">:</span>/usr/local/etc/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mongodb" tabindex="-1"><a class="header-anchor" href="#mongodb" aria-hidden="true">#</a> MongoDB</h2><ul><li>默认端口：27017</li><li>默认数据目录：/data/db</li><li>默认配置文件目录：/etc/mongod.conf</li></ul><h3 id="docker启动-4" tabindex="-1"><a class="header-anchor" href="#docker启动-4" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> mongodb <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">27017</span>:27017 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mongodb/data:/data/db <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mongodb/conf:/etc/mongod.conf <span class="token punctuation">\\</span>
  mongo:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-4" tabindex="-1"><a class="header-anchor" href="#podman启动-4" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> mongodb <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">27017</span>:27017 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mongodb/data:/data/db <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/mongodb/conf:/etc/mongod.conf <span class="token punctuation">\\</span>
  docker.io/mongo:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-4" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-4" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mongodb</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/mongo<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mongodb
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;27017:27017&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/mongodb/data<span class="token punctuation">:</span>/data/db
      <span class="token punctuation">-</span> ~/mongodb/conf<span class="token punctuation">:</span>/etc/mongod.conf
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> MONGO_INITDB_ROOT_USERNAME=admin  <span class="token comment"># 登录用户名</span>
      <span class="token punctuation">-</span> MONGO_INITDB_ROOT_PASSWORD=admin  <span class="token comment"># 登录密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a> ElasticSearch</h2><ul><li>默认端口：9200</li><li>开启单节点模式：&quot;discovery.type=single-node&quot;</li></ul><h3 id="docker启动-5" tabindex="-1"><a class="header-anchor" href="#docker启动-5" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> elasticsearch <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token punctuation">\\</span>
  elasticsearch:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-5" tabindex="-1"><a class="header-anchor" href="#podman启动-5" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> elasticsearch <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> <span class="token punctuation">\\</span>
  docker.io/elasticsearch:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-5" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-5" aria-hidden="true">#</a> docker compose启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;3&#39;</span>
services:
  elasticsearch:
    image: docker.io/elasticsearch:tag
    container_name: elasticsearch
    restart: always
    ports:
      - <span class="token string">&quot;9200:9200&quot;</span>
    environment:
      - <span class="token string">&quot;discovery.type=single-node&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq" aria-hidden="true">#</a> RabbitMQ</h2><p>优选选择版本号带<code>-management</code>的版本，不需要在额外安装WebUI</p><ul><li>默认端口：5672</li><li>默认WebUI访问端口：15672</li><li>默认数据目录：/var/lib/rabbitmq</li></ul><h3 id="docker启动-6" tabindex="-1"><a class="header-anchor" href="#docker启动-6" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> rabbitmq <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/rabbitmq/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
  rabbitmq:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-6" tabindex="-1"><a class="header-anchor" href="#podman启动-6" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> rabbitmq <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/rabbitmq/data:/var/lib/rabbitmq <span class="token punctuation">\\</span>
  docker.io/rabbitmq:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-6" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-6" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/rabbitmq<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rabbitmq
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5672:5672&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;15672:15672&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/rabbitmq/data<span class="token punctuation">:</span>/var/lib/rabbitmq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minio" tabindex="-1"><a class="header-anchor" href="#minio" aria-hidden="true">#</a> MinIO</h2><ul><li>默认端口：9000</li><li>默认WebUI访问端口：9001</li><li>默认数据目录：/data</li></ul><h3 id="docker启动-7" tabindex="-1"><a class="header-anchor" href="#docker启动-7" aria-hidden="true">#</a> docker启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9001</span>:9001 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/minio/data:/data <span class="token punctuation">\\</span>
  minio/minio:tag <span class="token punctuation">\\</span>
  server /data <span class="token punctuation">\\</span>
  --console-address <span class="token string">&quot;:9001&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman启动-7" tabindex="-1"><a class="header-anchor" href="#podman启动-7" aria-hidden="true">#</a> podman启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">podman</span> run <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--name</span> minio1 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> <span class="token number">9001</span>:9001 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> ~/minio/data:/data <span class="token punctuation">\\</span>
  docker.io/minio/minio:tag <span class="token punctuation">\\</span>
  server /data <span class="token punctuation">\\</span>
  --console-address <span class="token string">&quot;:9001&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose启动-7" tabindex="-1"><a class="header-anchor" href="#docker-compose启动-7" aria-hidden="true">#</a> docker compose启动</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">minio</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/minio/minio<span class="token punctuation">:</span>tag
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> minio
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:9001&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ~/minio/data<span class="token punctuation">:</span>/data
    <span class="token key atrule">command</span><span class="token punctuation">:</span> server /data <span class="token punctuation">-</span><span class="token punctuation">-</span>console<span class="token punctuation">-</span>address &quot;<span class="token punctuation">:</span>9001&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,69),l=[t];function p(c,r){return n(),s("div",null,l)}const d=a(i,[["render",p],["__file","dockerImage.html.vue"]]);export{d as default};
