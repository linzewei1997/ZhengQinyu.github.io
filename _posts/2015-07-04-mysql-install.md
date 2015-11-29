---
layout: post
title: "MySQL安装"
categories: 环境配置
tags: mysql
date: 2015-07-04 09:54:51
---

### 1 MySQL安装

在windows下安装MySQL数据库有两种方式  
一是下载`MSI`文件一键安装，虽然简单，但是个人觉得一键安装会添加一些不需要的服务，所以这里是不推荐的。  
二是解压包解压安装，解压安装比较方便卸载（只要删除所在的文件夹和将添加的mysql服务删掉就可以彻底的卸载了）

附上 [MySQL下载地址](http://dev.mysql.com/downloads/mysql/)  

<!-- more -->

### 2 解压安装

本次记录的是MySQL解压版的安装，下载的时候根据相应的平台选择压缩包，我下载的是`5.6.25`版本的`Windows (x86, 64-bit), ZIP Archive`,解压到对应的文件夹。这里我的文件夹是`D:\EnvPath\mysql-5.6.25-winx64`。

#### 2.1 配置

将安装目录下的`my-default.ini`文件修改成`my.ini`,或者直接新建一个`my.ini`文件（我就直接新建一个了），打开编辑该文件。这里修改了编码方式为`utf-8`，其它的都选择默认的配置，配置文件修改如下：

	{% highlight ini %}
[mysql]
default-character-set = utf8
	
[mysqld]
character_set_server = utf8
basedir = D:\EnvPath\mysql-5.6.25-winx64
datadir = D:\EnvPath\mysql-5.6.25-winx64\data
	
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 
	{% endhighlight %}

#### 2.2 安装MySQL服务

	补充：检查"D:\EnvPath\mysql-5.6.25-winx64\data"是否存在，如果不存在（mysql版本5.7.9开始后是没有的），先执行"mysqld --initialize-insecure"生成这些数据库文件

用管理员权限，cd 到MySQL安装目录的bin目录下，执行`mysqld install`安装mysql服务，安装成功后显示`Service successfully installed.`,如果想卸载该服务可以执行`mysqld remove`卸载服务。  

之后就可以就可以用`net start mysql`和`net stop mysql`来开启和关闭mysql服务了。

默认是没有密码的，我们可以为其添加密码，还是在MySQL的bin目录下执行（假设将密码设置成123456），执行

	mysqladmin -u root password 123456

现在，Enjoy it!!!