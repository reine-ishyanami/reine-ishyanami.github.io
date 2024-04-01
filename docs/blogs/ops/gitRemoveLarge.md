---
title: Git删除提交记录中的大文件
date: 2023/10/17
tags:
 - Git
categories:
 - ops
---

# Git删除提交记录中的大文件
> 背景：不小心在代码库中提交了一个大型文件，如视频，音频等，导致代码库体积过大，影响代码库的下载以及维护

## 可以分为一下几种情况进行讨论

### 1. 在将文件add后及时发现（已添加）

```shell
# 将暂存区的文件删除
git rm --cached 文件名
```

### 2. 在将文件add后未及时发现并进行了提交（已提交）

```shell
# reset 回退到上一次提交
git reset HEAD^
# 垃圾回收
git gc
```

### 3. 在提交完后推送到了远端仓库（已推送）
[filter-repo](https://github.com/newren/git-filter-repo)

```shell
# 删除本地提交记录与重写提交历史
git gc
# 下面命令为第三方命令，需要点击上方链接额外下载
git filter-repo --path-glob 文件名 --invert-paths --force
git gc --aggressive
# 强制推送到远端
git remote add origin git@github.com:username/repository.git
git push --all --force
git push --tags --force
```

### 4. 他人推送大文件到远端仓库（已推送）
[largefiles](https://github.com/ticktechman/git-commands)

```shell
# 找出仓库中的前10大文件
git gc
git rev-list --objects --all ` # 列举仓库中的所有对象，包括(blob, tree, commit, tag) 如果是blob对象，输出结果会包含文件名
| grep -f ` # 过滤
<(git verify-pack -v .git/objects/pack/*.idx ` # 根据索引文件输出所有对象的ObjectID，对象类型，大小等信息
| grep blob ` # 过滤掉所有非blob对象
| sort -k 3 -n ` # 将输出结果以第三个字段（即大小）进行排序
| cut -f 1 -d ' ' ` # 按空格分割字段，取第一个字段（即ObjectID）
| tail -10) # 取尾部的10行数据

# 也可以使用下面一条命令替代上一条命令，需要点击上方链接额外下载
git largefiles -t 10 

# 删除文件与重写提交记录
git filter-repo --path-glob 文件名 --invert-paths --force
git gc --aggressive
# 强制推送到远端
git remote add origin git@github.com:username/repository.git
git push --all --force
git push --tags --force

```