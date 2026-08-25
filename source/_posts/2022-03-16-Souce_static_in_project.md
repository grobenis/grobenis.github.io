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

<!--More-->

## RAM统计

统计工具Valgrind
统计内存占用可以用下valgrind的工具  ubuntu可以使用apt直接安装的   使用的方法是写一个demo  调用算法的接口   编译成可执行文件    然后通过valgrind执行它。

```
valgrind --tool=massif --stacks=yes --time-unit=B --alloc-fn=generic_malloc  ./swimming_analyzer_demo
```
然后在当前目录会生成一个文件  比如：massif.out.1250590    后面的数字是个id
再安装一个软件  `massif-visualizer`,  使用这个软件打开生成的这个文件massif.out.<id>.

![image-20220316163119363](images/2022-03-16-Souce_static_in_project/image-20220316163119363.png)

也可以辅助分析它的内存RAM消耗。

## ROM统计

关于程序占用ROM的计算借助arm交叉编译器实现

可以通过以下命令查看文件占用flash和ram的大小。

```
arm-none-eabi-size -t *.a
```

显示结果如下：

![/image-20220318103734602](images/2022-03-16-Souce_static_in_project/image-20220318103734602.png)

上图中，TOTALS所在的dec指示的数字即是占用ROM空间的情况，单位为字节（Byte）。上图中占用为4863/1024 =4.74KB。



### 利用工具统计资源泄露情况

```
valgrind --tool=memcheck --leak-check=full --show-reachable=yes --trace-children=yes build_linux-x86_64/L67main
```

