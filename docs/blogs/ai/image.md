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