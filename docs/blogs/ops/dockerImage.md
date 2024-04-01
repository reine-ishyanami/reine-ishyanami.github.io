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


## Redis

### docker启动

```shell
docker run \
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