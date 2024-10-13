---
title: Rust 交叉编译
date: 2024/10/5
tags:
  - Rust
---

# Rust 交叉编译

> 本文基于原生 `cargo build` 介绍，如不满足需求，推荐使用 `cargo-zigbuild` 工具
>
> 别问为什么只提供了三种解决方案，因为作者只有这三种设备

## x86_64 Linux 编译到 aarch64-unknown-linux-gnu

### Debian/Ubuntu

1. 添加编译目标

   ```bash
   rustup target add aarch64-unknown-linux-gnu
   ```

2. 安装交叉编译工具链

   ```bash
   sudo apt-get install gcc-aarch64-linux-gnu
   ```

3. 安装libc

   ```bash
   sudo apt-get install libc6-dev-arm64-cross
   ```

4. 指定对应编译目标使用的编译器，编辑 `~/.cargo/config.toml` 文件，或者项目目录下的 `.cargo/config.toml` 文件，添加如下内容：

   ```toml
   [target.aarch64-unknown-linux-gnu]
   linker = "aarch64-linux-gnu-gcc"
   ```

5. 编译

   ```bash
   cargo build --release --target=aarch64-unknown-linux-gnu
   ```

### Arch Linux

TODO

## x86_64 Linux 编译到 x86_64-pc-windows-gnu

### Debian/Ubuntu

1. 添加编译目标

   ```bash
   rustup target add x86_64-pc-windows-gnu
   ```

2. 安装交叉编译工具链

   ```bash
   sudo apt-get install mingw-w64
   ```

3. 编译

   ```bash
   cargo build --release --target=x86_64-pc-windows-gnu
   ```

### Arch Linux

1. 添加编译目标

   ```bash
   rustup target add x86_64-pc-windows-gnu
   ```

2. 安装交叉编译工具链

   ```bash
   sudo pacman -S mingw-w64
   ```

3. 编译

   ```bash
   cargo build --release --target=x86_64-pc-windows-gnu
   ```

## x86_64 Windows 编译到 x86_64-unknown-linux-gnu

TODO

## 附带 `cargo-zigbuild` 构建ci脚本

> 标name的部分字段需替换为对于产物名称

1. 手动触发编译一个平台

   ```yml
   name: Zigbuild Specify Target
   
   on:
     workflow_dispatch:
       inputs:
         target:
           required: true
           type: string
           description: compile target
     workflow_call:
       inputs:
         target:
           required: true
           type: string
           description: compile target
   
   jobs:
     release:
       runs-on: ${{ contains( inputs.target, 'linux' ) && 'ubuntu-latest' || ( contains( inputs.target, 'apple' ) && 'macos-latest' || ( contains( inputs.target, 'windows' ) && 'windows-latest' || 'ubuntu-latest' ) ) }}
       env:
         build-tool: ${{ contains( inputs.target, 'windows-msvc' ) && 'build' || 'zigbuild' }}
         executable: ./target/${{inputs.target}}/release/*.exe
       steps:
         - uses: actions/checkout@v4
           with:
             submodules: recursive
         - name: install target
           run: rustup target add ${{ inputs.target }}
         - uses: goto-bus-stop/setup-zig@v2
           if: ${{ env.build-tool == 'zigbuild' }}
         - name: Install cargo-zigbuild
           if: ${{ env.build-tool == 'zigbuild' }}
           run: cargo install cargo-zigbuild
         - name: cargo compile
           run: cargo ${{ env.build-tool }} --target ${{ inputs.target }} --release
         - name: show target
           run: ls -R ./target
         - name: Get product path
           if: ${{ runner.os != 'Windows' }}
           run: echo "executable=$(find . -maxdepth 4 -type f -exec file {} \; | grep 'executable' | grep 'target' | grep -o '^[^:]*')" >> "$GITHUB_ENV"
         - name: Upload product as an artifact
           uses: actions/upload-artifact@v4
           with:
             name: artifact
             path: |
               ${{ env.executable }}
   ```

2. 自动触发编译5个常用平台并发布发行版

   ```yml
   name: Release By Zigbuild
   
   permissions:
     "contents": "write"
   
   on:
     pull_request:
     push:
       tags:
         - '**[0-9]+.[0-9]+.[0-9]+*'
   
   jobs:
     build-all:
       strategy:
         matrix:
           target:
             - "aarch64-apple-darwin"
             - "x86_64-apple-darwin"
             - "x86_64-unknown-linux-gnu"
             - "aarch64-unknown-linux-gnu"
             - "x86_64-pc-windows-msvc"
       name: Build For ${{ matrix.target }}
       uses: ./.github/workflows/zigbuild.yml
       with:
         target: ${{ matrix.target }}
     release:
       runs-on: ubuntu-latest
       needs: build-all
       steps:
         - uses: actions/checkout@v4
           with:
             submodules: recursive
         - name: Download All Artifacts
           uses: actions/download-artifact@v4
           with:
             path: product
             pattern: name-*
             merge-multiple: false
         - name: read CHANGELOG.md
           id: read
           run: |
             echo "TITLE=$(awk '/^#[^#]/{sub(/^# /, ""); print; exit}' CHANGELOG.md)" >> "$GITHUB_ENV"
             echo "$(awk '/^#[^#]/{if (flag) exit; flag=1; next} flag {if ($0 ~ /\S/) {print; found=1} else if (found) {print}}' CHANGELOG.md)" > body.txt
         - name: compress
           run: |
             cd product
             for dir in */; do
                 dirname="${dir%/}"
                 if [[ $dirname == *"windows"* ]]; then
                     echo "package $dirname to $dirname.zip"
                     zip -r "$dirname.zip" "$dirname"
                 else
                     echo "package $dirname to $dirname.tar.gz"
                     tar -czf "$dirname.tar.gz" "$dirname"
                 fi
             done
         - name: List Directory
           run: ls -R product
         - name: Upload Release
           uses: softprops/action-gh-release@v1
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
           with:
             name: ${{ env.TITLE }}
             body_path: ./body.txt
             draft: false
             fail_on_unmatched_files: true
             prerelease: false
             files: |
               ./product/*.zip
               ./product/*.tar.gz
   ```

3. 发布时需要在项目根目录下创建 CHANGELOG.md 文件并按规则编写好内容，规则如下

   ```markdown
   # 发行版标题
   
   本次变更内容

   # 上次发行版标题

   上次变更内容

   ...
   ```
