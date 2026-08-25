---
layout: post
title: Ubuntu 连接蓝牙鼠标
date: 2020-02-15
Author: guoben
categories: 实验
tags: [Ubuntu]
comments: true
toc: true
---

打开命令行

本文介绍在 Ubuntu 16.04 上通过命令行连接蓝牙鼠标的完整流程，包括删除旧配对记录、重启蓝牙、扫描配对与信任设备等步骤，并给出连接成功后核对配对信息文件的排查经验。

> **命令行之下，蓝牙设备亦可驯服**

<!--more-->

$ sudo -i

```
[bluetooth]# power off
[bluetooth]# power on
[bluetooth]# scan on
[bluetooth]# connect XX:XX:XX:XX:XX:XX
[Arc Touch Mouse SE]# trust
[Arc Touch Mouse SE]# pair
[Arc Touch Mouse SE]# unblock
[Arc Touch Mouse SE]# power off
[bluetooth]# power on
```

注意先从系统设置的蓝牙里，把之前配对的设备删掉，我还把 /var/lib/bluetooth/..../XX:XX:XX:XX:XX 的老的配对文件也给删了。
重新配对后，info 文件里的内容比1楼里的内容多了 ConnectionParameters、IdentityResolvingKey、LocalSignatureKey、LongTermKey 等好几段数据
