---
title: Docker常用镜像启动脚本
date: 2024/3/29
tags:
 - Docker
categories:
 - ops
---

# Docker常用镜像启动脚本

下面脚本中的tag可以更换为任意版本号或者latest

## MySQL

### docker启动

```shell
docker run \
  -d \
  --name mysql \
  -p 3306:3306 \  # MySQL端口
  -v ~/mysql/data:/var/lib/mysql \  # 挂载数据目录
  -v ~/mysql/conf:/etc/mysql/conf.d \  # 挂载配置文件目录
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql:tag
```

### podman启动

```shell
podman run \
  -d \
  --name mysql \
  -p 3306:3306 \  # MySQL端口
  -v ~/mysql/data:/var/lib/mysql \  # 挂载数据目录
  -v ~/mysql/conf:/etc/mysql/conf.d \  # 挂载配置文件目录
  -e MYSQL_ROOT_PASSWORD=123456 \
  docker.io/mysql:tag
```

### docker compose启动

```yaml
version: '3'
services:
  mysql:
    image: docker.io/mysql:tag
    container_name: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    ports:
      - "3306:3306"
    volumes:
      - ~/mysql/data:/var/lib/mysql
      - ~/mysql/conf:/etc/mysql/conf.d
```

## PostgreSQL

### docker启动

```shell
docker run \
  -d \
  --name postgres \
  -p 5432:5432 \  # PostgreSQL端口
  -v ~/postgres/data:/var/lib/postgresql/data \  # 挂载数据目录 
  -e POSTGRES_PASSWORD=123456 \  # 容器密码 
  postgres:tag
```

### podman启动

```shell
podman run \
  -d \
  --name postgres \
  -p 5432:5432 \  # PostgreSQL端口
  -v ~/postgres/data:/var/lib/postgresql/data \  # 挂载数据目录
  -e POSTGRES_PASSWORD=123456 \  # 容器密码 
  docker.io/postgres:tag
```

### docker compose启动

```yaml
version: '3'
services:
  postgres:
    image: docker.io/postgres:tag
    container_name: postgres
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - ~/postgres/data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=123456
```

### 可用环境变量

- POSTGRES_USER: 创建数据库用户名（缺省postgres）
- POSTGRES_PASSWORD: 创建数据库密码（必须）
- POSTGRES_DB: 创建数据库名（缺省变量POSTGRES_USER值）
- POSTGRES_INITDB_ARGS: 传递给initdb的参数（缺省）
- PGDATA: 数据目录（缺省/var/lib/postgresql/data）

## Redis

### docker启动

```shell
docker run \
  -d \
  --name redis \
  -p 6379:6379 \  # Redis端口
  -v ~/redis/data:/data \  # 挂载数据目录
  -v ~/redis/conf:/usr/local/etc/redis \  # 挂载配置文件目录
  redis:tag
```

### podman启动

```shell
podman run \
  -d \
  --name redis \
  -p 6379:6379 \  # Redis端口
  -v ~/redis/data:/data \  # 挂载数据目录
  -v ~/redis/conf:/usr/local/etc/redis \  # 挂载配置文件目录
  docker.io/redis:tag
```

### docker compose启动

```yaml
version: '3'
services:
  redis:
    image: docker.io/redis:tag
    container_name: redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - ~/redis/data:/data
      - ~/redis/conf:/usr/local/etc/redis
```

## RedisStack

### docker启动

```shell
docker run \
  -d \
  --name redis-stack \
  -p 6379:6379 \  # Redis端口
  -p 8001:8001 \  # RedisInsight WebUI访问端口
  -v ~/redis/data:/data \  # 挂载数据目录
  -v ~/redis/conf:/usr/local/etc/redis \  # 挂载配置文件目录
  redis/redis-stack:tag
```

### podman启动

```shell
podman run \
  -d \
  --name redis-stack \
  -p 6379:6379 \  # Redis端口
  -p 8001:8001 \  # RedisInsight WebUI访问端口
  -v ~/redis/data:/data \  # 挂载数据目录
  -v ~/redis/conf:/usr/local/etc/redis \  # 挂载配置文件目录
  docker.io/redis/redis-stack:tag
```

### docker compose启动

```yaml
version: '3'
services:
  redis-stack:
    image: docker.io/redis/redis-stack:tag
    container_name: redis-stack
    restart: always
    ports:
      - "6379:6379"
      - "8001:8001"
    volumes:
      - ~/redis/data:/data
      - ~/redis/conf:/usr/local/etc/redis
```

## MongoDB

### docker启动

```shell
docker run \
  -d \
  --name mongodb \
  -p 27017:27017 \  # MongoDB端口
  -v ~/mongodb/data:/data/db \  # 挂载数据目录
  -v ~/mongodb/conf:/etc/mongod.conf \  # 挂载配置文件目录
  mongo:tag
```

### podman启动

```shell
podman run \
  -d \
  --name mongodb \
  -p 27017:27017 \  # MongoDB端口
  -v ~/mongodb/data:/data/db \  # 挂载数据目录
  -v ~/mongodb/conf:/etc/mongod.conf \  # 挂载配置文件目录
  docker.io/mongo:tag
```

### docker compose启动

```yaml
version: '3'
services:
  mongodb:
    image: docker.io/mongo:tag
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - ~/mongodb/data:/data/db
      - ~/mongodb/conf:/etc/mongod.conf
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin  # 登录用户名
      - MONGO_INITDB_ROOT_PASSWORD=admin  # 登录密码
```

## elasticsearch

### docker启动

```shell
docker run \
  -d \
  --name elasticsearch \
  -p 9200:9200 \  # Elasticsearch端口
  -p 9300:9300 \  # Elasticsearch端口
  -e "discovery.type=single-node" \  # 单节点模式
  elasticsearch:tag
```

### podman启动

```shell
podman run \
  -d \
  --name elasticsearch \
  -p 9200:9200 \  # Elasticsearch端口
  -p 9300:9300 \  # Elasticsearch端口
  -e "discovery.type=single-node" \  # 单节点模式
  docker.io/elasticsearch:tag
```

### docker compose启动

```shell
version: '3'
services:
  elasticsearch:
    image: docker.io/elasticsearch:tag
    container_name: elasticsearch
    restart: always
    ports:
      - "9200:9200"
      - "9300:9300"
    environment:
      - "discovery.type=single-node"
```


## RabbitMQ

优选选择版本号带`-management`的版本，不需要在额外安装WebUI

### docker启动

```shell
docker run \
  -d \
  --name rabbitmq \
  -p 5672:5672 \  # RabbitMQ端口
  -p 15672:15672 \  # RabbitMQ WebUI访问端口
  -v ~/rabbitmq/data:/var/lib/rabbitmq \  # 挂载数据目录
  rabbitmq:tag
```

### podman启动

```shell
podman run \
  -d \
  --name rabbitmq \
  -p 5672:5672 \  # RabbitMQ端口
  -p 15672:15672 \  # RabbitMQ WebUI访问端口
  -v ~/rabbitmq/data:/var/lib/rabbitmq \  # 挂载数据目录
  docker.io/rabbitmq:tag
```

### docker compose启动

```yaml
version: '3'
services:
  rabbitmq:
    image: docker.io/rabbitmq:tag
    container_name: rabbitmq
    restart: always
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - ~/rabbitmq/data:/var/lib/rabbitmq
```
