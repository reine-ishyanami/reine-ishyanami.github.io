---
title: Docker 常用镜像启动脚本
date: 2024/3/29
tags:
  - Docker
categories:
  - ops
---

# Docker 常用镜像启动脚本

下面脚本中的tag可以更换为任意版本号或者latest

## MySQL

- 默认端口：3306
- 默认数据目录：/var/lib/mysql
- 默认配置文件目录：/etc/mysql/conf.d

### docker 启动

```shell
docker run \
  -d \
  --name mysql \
  -p 3306:3306 \
  -v ~/mysql/data:/var/lib/mysql \
  -v ~/mysql/conf:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=123456 \
  mysql:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name mysql \
  -p 3306:3306 \
  -v ~/mysql/data:/var/lib/mysql \
  -v ~/mysql/conf:/etc/mysql/conf.d \
  -e MYSQL_ROOT_PASSWORD=123456 \
  docker.io/mysql:tag
```

### docker compose 启动

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

- 默认端口：5432
- 默认数据目录：/var/lib/postgresql/data
- 配置容器密码：POSTGRES_PASSWORD=123456

### docker 启动

```shell
docker run \
  -d \
  --name postgres \
  -p 5432:5432 \
  -v ~/postgres/data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123456 \
  postgres:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name postgres \
  -p 5432:5432 \
  -v ~/postgres/data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=123456 \
  docker.io/postgres:tag
```

### docker compose 启动

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

- POSTGRES_USER: 创建数据库用户名（缺省 postgres）
- POSTGRES_PASSWORD: 创建数据库密码（必须）
- POSTGRES_DB: 创建数据库名（缺省变量 POSTGRES_USER 值）
- POSTGRES_INITDB_ARGS: 传递给 initdb 的参数（缺省）
- PGDATA: 数据目录（缺省 /var/lib/postgresql/data）

## Redis

- 默认端口：6379
- 默认数据目录：/data
- 默认配置文件目录：/usr/local/etc/redis

### docker 启动

```shell
docker run \
  -d \
  --name redis \
  -p 6379:6379 \
  -v ~/redis/data:/data \
  -v ~/redis/conf:/usr/local/etc/redis \
  redis:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name redis \
  -p 6379:6379 \
  -v ~/redis/data:/data \
  -v ~/redis/conf:/usr/local/etc/redis \
  docker.io/redis:tag
```

### docker compose 启动

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

- 默认端口：6379
- 默认数据目录：/data
- 默认配置文件目录：/usr/local/etc/redis
- 默认WebUI访问端口：8001

### docker 启动

```shell
docker run \
  -d \
  --name redis-stack \
  -p 6379:6379 \
  -p 8001:8001 \
  -v ~/redis/data:/data \
  -v ~/redis/conf:/usr/local/etc/redis \
  redis/redis-stack:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name redis-stack \
  -p 6379:6379 \
  -p 8001:8001 \
  -v ~/redis/data:/data \
  -v ~/redis/conf:/usr/local/etc/redis \
  docker.io/redis/redis-stack:tag
```

### docker compose 启动

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

- 默认端口：27017
- 默认数据目录：/data/db
- 默认配置文件目录：/etc/mongod.conf

### docker 启动

```shell
docker run \
  -d \
  --name mongodb \
  -p 27017:27017 \
  -v ~/mongodb/data:/data/db \
  -v ~/mongodb/conf:/etc/mongod.conf \
  mongo:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name mongodb \
  -p 27017:27017 \
  -v ~/mongodb/data:/data/db \
  -v ~/mongodb/conf:/etc/mongod.conf \
  docker.io/mongo:tag
```

### docker compose 启动

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

## ElasticSearch

- 默认端口：9200
- 开启单节点模式："discovery.type=single-node"

### docker 启动

```shell
docker run \
  -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  elasticsearch:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  docker.io/elasticsearch:tag
```

### docker compose 启动

```shell
version: '3'
services:
  elasticsearch:
    image: docker.io/elasticsearch:tag
    container_name: elasticsearch
    restart: always
    ports:
      - "9200:9200"
    environment:
      - "discovery.type=single-node"
```

## RabbitMQ

优选选择版本号带`-management`的版本，不需要在额外安装WebUI

- 默认端口：5672
- 默认WebUI访问端口：15672
- 默认数据目录：/var/lib/rabbitmq

### docker 启动

```shell
docker run \
  -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -v ~/rabbitmq/data:/var/lib/rabbitmq \
  rabbitmq:tag
```

### podman 启动

```shell
podman run \
  -d \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -v ~/rabbitmq/data:/var/lib/rabbitmq \
  docker.io/rabbitmq:tag
```

### docker compose 启动

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

## MinIO

- 默认端口：9000
- 默认WebUI访问端口：9001
- 默认数据目录：/data

### docker 启动

```shell
docker run \
  -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -v ~/minio/data:/data \
  minio/minio:tag \
  server /data \
  --console-address ":9001"
```

### podman 启动

```shell
podman run \
  -d \
  --name minio1 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v ~/minio/data:/data \
  docker.io/minio/minio:tag \
  server /data \
  --console-address ":9001"
```

### docker compose 启动

```yaml
version: '3'
services:
  minio:
    image: docker.io/minio/minio:tag
    container_name: minio
    restart: always
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - ~/minio/data:/data
    command: server /data --console-address ":9001"
```
