---
title: 在工程中统计资源占用情况
Author: Grobenis
reward: true
copyright: true
date: 2022-03-16 16:28:29
categories: [SLAM]
tags: [SLAM,  C, Work]
---

简尔言之：

1. RAM: valgrind --tool=massif --stacks=yes --time-unit=B --alloc-fn=generic_malloc  ./demo
2. ROM: arm-none-eabi-size -t *.a
3. 检查内存泄漏：valgrind --tool=memcheck --leak-check=full --show-reachable=yes --trace-children=yes build_linux-x86_64/main

本文整理工程中统计资源占用的实用方法：用 Valgrind Massif 统计程序 RAM 峰值与栈占用，配合 massif-visualizer 可视化分析；用 arm-none-eabi-size 查看静态库的 ROM 占用；用 Valgrind Memcheck 检查内存泄漏。

> **资源占用可量化，内存问题无处藏**

<!--More-->

## RAM统计

统计工具Valgrind
统计内存占用可以用下valgrind的工具  ubuntu可以使用apt直接安装的   使用的方法是写一个demo  调用算法的接口   编译成可执行文件    然后通过valgrind执行它。

```
valgrind --tool=massif --stacks=yes --time-unit=B --alloc-fn=generic_malloc  ./swimming_analyzer_demo
```
然后在当前目录会生成一个文件  比如：massif.out.1250590    后面的数字是个id
再安装一个软件  `massif-visualizer`,  使用这个软件打开生成的这个文件massif.out.<id>.

![image-20220316163119363](image-20220316163119363.png)

也可以辅助分析它的内存RAM消耗。

## ROM统计

关于程序占用ROM的计算借助arm交叉编译器实现

可以通过以下命令查看文件占用flash和ram的大小。

```
arm-none-eabi-size -t *.a
```

显示结果如下：

![/image-20220318103734602](image-20220318103734602.png)

上图中，TOTALS所在的dec指示的数字即是占用ROM空间的情况，单位为字节（Byte）。上图中占用为4863/1024 =4.74KB。



### 利用工具统计资源泄露情况

```
valgrind --tool=memcheck --leak-check=full --show-reachable=yes --trace-children=yes build_linux-x86_64/L67main
```

