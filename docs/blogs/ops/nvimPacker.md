---
title: nvim 使用 packer 安装插件
date: 2024/7/21
tags:
  - Linux
categories:
  - ops
---

# nvim 使用 packer 安装插件

> 以下步骤默认已安装 nvim

## 安装 packer

### Linux

```shell
git clone --depth 1 https://github.com/wbthomason/packer.nvim ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

### Windows

```powershell
git clone https://github.com/wbthomason/packer.nvim "$env:LOCALAPPDATA\nvim-data\site\pack\packer\start\packer.nvim"
```

## 修改配置文件

> 用于添加 nvim 插件
> Linux 下路径 `~/.config/nvim/lua/plugins.lua`
> Windows 下路径 `~\AppData\Local\nvim\lua\plugins.lua`

文件原内容如下

```lua
return require('packer').startup(function()
    -- Packer can manage itself
    use 'wbthomason/packer.nvim'
    -- 添加语法高亮插件
    use {
        'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate'
    }
    -- 可添加更多其他插件配置，按其自述文档操作
end)
```

## 安装插件

在控制台中输入 nvim 进入 nvim 界面，输入 `:PackerInstall` 进行插件安装
