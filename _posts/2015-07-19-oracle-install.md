---
layout: post
title: "oracle安装"
categories: 环境配置
tags: oracle
date: 2015-07-19 18:19:56
---

### 1 Oracle安装验证出错

win8.1安装oracle12c时出现的错误

问题：执行安装程序验证所需的初始设置失败

原因：无法访问临时位置

<!-- more -->

### 2 解决方法

1. 右键`这台电脑`-`管理`-`共享文件夹`-`共享` 
2. 新建共享
3. 选择C盘
4. 设置共享名为`C$`
5. 设置权限为`管理员有完成访问权限，其他用户有只读访问权限(R)`
6. 继续安装

问题解决，安装成功！！