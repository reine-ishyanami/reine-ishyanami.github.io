---
title: PowerShell 终端设置默认编码页为 UTF-8
date: 2024/8/13
tags:
  - Console
categories:
  - ops
---

# PowerShell 终端设置默认编码页为 UTF-8

[参考链接](https://www.cnblogs.com/chkhk/p/17349669.html)

## 解决方案

1. 使用以下命令打开 PowerShell 的配置文件

   ```powershell
   notepad.exe $PROFILE
   ```

2. 如果没有配置文件，则创建一个

   ```powershell
   New-Item -ItemType File -Path $PROFILE -Force
   ```

3. 在配置文件中添加以下内容

   ```powershell
   # 输入的内容格式为UTF-8
   [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
   # 当前代码页改为65001（UTF-8）
   chcp 65001 | Out-Null
   ```

## 注意事项

* 配置文件一般默认位置在 `C:\Users\用户名\Documents\PowerShell\`（PowerShell7），或 `C:\Users\用户名\Documents\WindowsPowerShell\`（PowerShell5）。名字通常以 `_profile.ps1` 结尾。

* 如果提示 `无法加载文件` 等类似的错误，则可能是因为系统安全策略禁止运行 PowerShell 脚本，可用如下步骤解决

    1. 在 PowerShell 命令行窗口中，输入以下命令，以查看当前执行策略

       ```powershell
       Get-ExecutionPolicy
       ```

    2. 如果执行策略为 `Restricted`，则表示禁止运行脚本，需要修改执行策略，输入以下命令

       ```powershell
       Set-ExecutionPolicy RemoteSigned
       ```
    3. 然后输入 `Y` 确认修改

    4. 修改完成后，再次输入 `Get-ExecutionPolicy`，查看执行策略是否已经修改为 `RemoteSigned`