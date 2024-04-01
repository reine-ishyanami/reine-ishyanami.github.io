---
title: Git只克隆仓库中的一个目录
date: 2023/10/18
tags:
 - Git
categories:
 - ops
---

# Git只克隆仓库中的一个目录
> 背景：远程仓库中有很多个目录，而自己开发时只需要用到其中一两个目录或文件，一次性克隆整个仓库可能耗时过长

1. 设置需要克隆仓库中的哪些类型文件
    ```shell
    git clone --filter=blob:none --sparse <url>
    ```

2. 添加需要进行克隆的目录，执行此命令后会进行clone操作
    ```shell
    git sparse-checkout add <dir>
    ```
    
3. 设置需要进行克隆的目录，执行此命令后会进行clone操作，并且删除不需要的目录
    ```shell
    git sparse-checkout set <dir>
    ```

