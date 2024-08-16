---
title: oh-my-zsh 安装使用
date: 2024/6/9
tags:
  - Linux
---

# oh-my-zsh 安装使用

[参考文章](https://www.haoyep.com/posts/zsh-config-oh-my-zsh/)

> 以Debian系为实例，其他系统在使用包管理器安装软件时须更换为对应的包管理器，其他操作如有区别会在文中注明，

## zsh 安装（已安装 zsh 可跳过）

1. 更新软件源
	
	```shell
	sudo apt update && sudo apt upgrade -y
	```
 
2. 安装 zsh，顺带把安装 oh-my-zsh 的 git, curl, wget 安装了
	
	```shell
	sudo apt install zsh git curl wget -y
	```

3. 设置 zsh 为默认 shell

   ```shell
   chsh -s /bin/zsh
   ```

4. 重启终端或直接输入 `zsh` 进入 zsh 终端

## oh-my-zsh 安装

1. 安装 oh-my-zsh
	
	| Method | Command                                         |
	|--------|-------------------------------------------------|
	| curl   | sh -c "$(curl -fsSL https://install.ohmyz.sh/)" |
	| wget   | sh -c "$(wget -O- https://install.ohmyz.sh/)"   |
	| fetch  | sh -c "$(fetch -o - https://install.ohmyz.sh/)" |

2. 查看可用主题

	```shell
	cd ~/.oh-my-zsh/themes && ls
	```

3. 设置主题，修改 `~/.zshrc` 文件

	```shell
 	...
 	ZSH_THEME="xxx"
 	...
 	```

4. 安装插件[其他插件列表](https://github.com/unixorn/awesome-zsh-plugins)

   | Name                    | Command                                                                                                                              |
   |-------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
   | zsh-autosuggestions     | git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions            |
	| zsh-syntax-highlighting | git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting |
	| z                       | 内置                                                                                                                                   |
	| extract                 | 内置                                                                                                                                   |

5. 配置插件

	```shell
 	...
 	plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)  # 想用啥配啥
 	...
 	```

6. 激活配置文件 `source ~/.zshrc`