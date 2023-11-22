---
title: Podman进阶使用
date: 2023/11/22
tags:
 - Podman
categories:
 - mix
---

# Podman进阶使用

> 本文只列出`podman`相较于`docker`的特殊命令以及与`docker`有别的命令

## 使用pod

> [使用pod](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/9/html/building_running_and_managing_containers/assembly_working-with-pods_building-running-and-managing-containers#doc-wrapper)

### 创建pod


1. 创建空 pod

    ```shell
    podman pod create --name mypod
    ```

2. 列出所有 pod

    ```shell
    podman pod ps
    ```

3. 列出与其关联的所有 pod 和容器

    ```shell
    podman ps -a --pod
    ```

4. 在名为 `mypod` 的现有 pod 中运行名为 `myubi` 的容器

    ```shell
    podman run -dt --name myubi --pod mypod registry.access.redhat.com/ubi9/ubi /bin/bash
    ```

### 显示pod信息

1. 显示 pod 中容器的运行进程

    ```shell
    podman pod top mypod
    ```

2. 显示一个或多个 pod 中容器的资源使用情况统计的实时流

    ```shell
    podman pod stats -a --no-stream
    ```

3. 显示描述 pod 的信息

    ```shell
    podman pod inspect mypod
    ```

### 停止 pod

1. 停止 pod `mypod`

    ```shell
    podman pod stop mypod
    ```

### 删除 pod

1. 删除 pod `mypod`

    ```shell
    podman pod rm mypod
    ```

2. 检查所有容器和 pod 是否已移除

    ```shell
    podman ps
    podman pod ps
    ```