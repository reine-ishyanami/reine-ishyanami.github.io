---
title: AI 绘图知识点
date: 2025/9/14
tags:
  - AI
  - Image
---

# AI 绘图知识点

## 绘图模型分类

1. Checkpoint (检查点，大模型)

2. Embedding (词嵌入模型)

3. LoRA (低秩训练模型)

4. Upscalers (放大模型)

5. ControlNets (控制模型)

## 基础大模型 (Checkpoint)

### 分类

#### 底模版本

1. [SD1.5](https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5)
2. [SDXL](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
3. [SD3.5](https://huggingface.co/stabilityai/stable-diffusion-3.5-medium)
4. [Flux](https://huggingface.co/black-forest-labs/FLUX.1-dev)
5. [Flux Context](https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev)
6. [Illustrious](https://huggingface.co/OnomaAIResearch/Illustrious-XL-v2.0)
7. [PONY](https://huggingface.co/LyliaEngine/Pony_Diffusion_V6_XL)
...

#### 制作方式

Training(训练) | Merge(融合)

#### 生成风格

Realistic / Photorealistic (真实系)
3D，CG，rendered (2.5D系)
Anime, Illustration (二次元系)

#### 模型下载关键词

1. 版本
2. VAE 表示该模型自带 VAE(变分自编解码器)
3. inpainting 表示该模型用于重绘



## 提示词 (Prompt)

* 正向提示词：需要在画面中出现的东西
* 反向提示词：需要在画面中规避的东西

### 提示词起手式

真实系

* 正向提示词

```text
(masterpiece, best quality:1.2), highres, realistic, photorealistic, photography, 8k, RAW
```

* 反向提示词

```text
semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, (worst quality, low quality:2), nsfw, naked, nude, deformed iris, deformed pupils, mutated hands and fingers, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation
```

2.5D系

* 正向提示词

```text
(masterpiece, best quality:1.2), 3d, 3d rendering, professional 3d model, rendered, cgi
```

* 反向提示词

```text
sketch, cartoon, drawing, anime,(worst quality, low quality, normal quality:2), nsfw, naked, nude, deformed iris, deformed pupils, mutated hands and fingers, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation
```

二次元系

* 正向提示词

```text
(masterpiece, best quality:1.2), anime, illustration, very aesthetic, wallpaper
```

* 反向提示词

```text
photorealistic, realistic, (worst quality, low quality, normal quality:2), nsfw, naked, nude, deformed iris, deformed pupils, mutated hands and fingers, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation
```

### 提示词权重

1. 加()，一层()表示权重 *1.1，一层[]表示权重 /1.1，可以套多层

```text
(sunset)
```

2. (tags:weight) ()内:后面加上权重

```text
(sunset:1.1)
```

## 参数调节

1. 分辨率 SD1.5最佳(512x512), SDXL和SD3.5最佳(1024x1024)
2. 批次，一次性生成多少张图片
3. 采样器 dpmpp2m / euler a
4. 调度器 Karras
5. 采样步数：原始噪点图片去噪次数，默认20
6. 随机种子：每次随机(-1)，固定则每次一致
7. CFG: 越高提示词还原度越高
8. 重绘幅度：在图生图中，取值0.0-1.0，越小重绘幅度越小（如小于0.5则几乎不会重绘或看不出差别）

## 缩放模式（图生图）

1. 拉伸原图
2. 裁剪原图
3. 填充空白
4. 潜空间放大（效果类似拉伸）

## 高分辨率修复（高清放大）

### 放大算法

1. Latent（潜空间放大算法）
2. R-ESRGAN（非潜空间放大算法）

**SD放大** （分块放大）

## 局部重绘

## 附加网络模型

> 使用时需要对应上 Checkpoint 大模型版本

1. Embedding
2. LoRA

## Embedding

> 对每一个特定的提示词使用固定的风格，形象

作用

1. 特定触发词绑定人物形象
2. 特定触发词绑定指定绘制风格
3. 辅助描述人物固定形象
4. 消除作品负面影响（负面 Embedding）
5. 提升图片质量

## LoRA

WebUI中使用方法

```
<lora:blindbox_v1_mix:1>  // <lora:name:weight>
```

1. 角色类(Character) LoRA
2. 风格类(Style) LoRA
3. 概念类(Concept/Object) LoRA
4. 功能性(Function) LoRA

## ControlNet

控制网络

1. Canny (硬边缘) 

**线稿上色**

> 主要用于识别图片边缘，生成的图片为密集的线条图
> Threshold 影响识别到的细节数量，越小细节越多

2. Lineart (线稿)

**通常可用于替代 Canny**

3. SoftEdge (软边缘)

> 相较于 Canny，线条更加粗糙，柔软

4. Depth (深度)

> 图片内容处理后以黑白渐变区分物体在画面中的远近，远黑近白

1. OpenPose (姿态)
