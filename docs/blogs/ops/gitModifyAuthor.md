---
title: Git修改提交记录中的作者信息
date: 2023/10/21
tags:
 - Git
categories:
 - ops
---

# Git修改提交记录中的作者信息
> 背景：在主机中配置了多个git账户信息，由于平时开发公司代码比较多，将公司账户信息配置在`~/.gitconfig`文件中，偶尔写一些自己的开源项目，使用的自己的账户信息，将信息配置在项目目录下的`.git/config`文件中，有次在开发项目时忘记配置用户信息，导致提交记录中的用户信息混乱。

## 可以分为一下几种情况进行讨论

**以下几种情况都需要先修改用户信息**
```shell
git config user.name "xxx"
git config user.email "xxx@yy.zz"
```

### 1. 只有最近一次提交记录的用户信息不正确
```shell
# amend修改commit信息，no-edit不编辑提交描述信息，reset-author重置作者信息（用户名与邮箱）
git commit --amend --no-edit --reset-author
```

### 2. 最近几次提交记录的用户信息都不正确
```shell
# $REV 为提交记录的hash值，该命令会修改该提交记录以及之后的所有commit信息
git rebase -i $REV --exec "git commit --amend --no-edit --reset-author"
# rebase操作执行时会弹出一个编辑窗口，直接保存
```

### 3. 所有提交记录的用户信息都不正确
```shell
# 该命令会修改从首次提交记录开始的所有commit信息
git rebase -r --root --exec "git commit --amend --no-edit --reset-author"
```

### 4. 中间的几次提交记录的用户信息不正确
```shell
# $REV 为提交记录的hash值，该命令会修改该提交记录以及之后的所有commit信息
git rebase -i $REV --exec "git commit --amend --no-edit --reset-author"
# rebase操作执行时会弹出一个编辑窗口，删除掉不需要修改的提交记录（根据提交描述信息选择），保存
```

**修改完成后如果需要提交到远程仓库**
```shell
git push --force --all
```