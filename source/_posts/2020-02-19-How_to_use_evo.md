---
layout: post
title: 使用 evo 工具评测 SLAM
description: "evo是一款用于视觉里程计和slam问题的轨迹评估工具。核心功能是能够绘制相机的轨迹，或评估估计轨迹与真值的误差。支持多种数据集的轨迹格式（TUM、KITTI、EuRoC MAV、ROS的bag），同…"
date: 2020-02-15
Author: guoben
categories: 实验
tags: [VIO,evo,SLAM]
comments: true
toc: true
---

evo是一款用于视觉里程计和slam问题的轨迹评估工具。核心功能是能够绘制相机的轨迹，或评估估计轨迹与真值的误差。支持多种数据集的轨迹格式（TUM、KITTI、EuRoC MAV、ROS的bag），同时支持这些数据格式之间进行相互转换。在此仅对其基本功能做简要介绍。并且介绍如何修改经典的SLAM算法以输出可使用evo评测的轨迹。

[github地址](https://github.com/MichaelGrupp/evo)

本文介绍 SLAM 轨迹评估工具 evo 的安装与基本用法，说明 evo_ape、evo_rpe、evo_traj、evo_res 等命令的作用与参数，并以 EuRoC、TUM 数据为例演示轨迹绘制与误差对比，同时讲解如何修改 VINS-Mono 源码输出符合 TUM 格式的轨迹文件。

> **轨迹评估有据，SLAM 精度了然**

<!-- more -->

## 安装

1. 使用pypi直接安装：

``` pip install evo --upgrade --no-binary evo ```

2. 本地编译安装

``` pip install --editable . --upgrade --no-binary evo```
安装完毕后，在命令行输入evo，若显示了相关信息，则表明安装成功。若提示"command not found"也不用惊慌，很多人遇到这种问题，重启电脑即可找到evo相应指令。

## 使用

**指标**

- ```evo_ape ``` - absolute pose error - 绝对误差计算绝对位姿误差(absolute pose error)，用于整体评估整条轨迹的全局一致性；
evo_rpe：计算相对位姿误差(relative pose error)，用于评价轨迹局部的准确性。
- `evo_rpe`  - relative pose error - 相对误差 （相对误差=绝对误差/真值）

**工具命令**

* `evo_traj` - tool for analyzing, plotting or exporting one or more trajectories 对轨迹进行分析、画图
* `evo_res` - tool for comparing one or multiple result files from `evo_ape` or `evo_rpe` 对比多个结果
* `evo_fig` - (experimental) tool for re-opening serialized plots (saved with `--serialize_plot`) 
* `evo_config` - tool for global settings and config file manipulation -设置参数

* `-va` a 对齐轨迹

evo绘制轨迹的指令为：evo_traj，后跟必要参数有：数据的格式（tum/kitti/bag/euroc等），轨迹文件。轨迹文件可以有多个，例如：
evo_traj tum traj1.txt traj2.txt
这个指令只是显示轨迹的基本信息，若要绘制轨迹，则增加可选参数 -p 或 --plot
evo_traj tum traj1.txt –p

## 说明

- 对比/绘制VINS-mono/fusion的轨迹时需要对其代码进行修改，具体参考[该博客](https://blog.rneko.com/posts/3937502838.html).

## 使用例子

### EuRoC

画groundtruth的轨迹

```
evo_traj euroc ./groundtruth/MH_01_data.csv -p --plot_mode=xyz
```

画某一次结果的轨迹

```
evo_traj tum ./result/MH_01/loop_result.csv -p --plot_mode=xyz
```

### TUM

groundtruth.txt 为外部运动捕捉系统采集到的相机位姿,格式为(time, t x , t y , t z , q x , q y , q z , q w ),

## 测试过程

### VINS-Mono

VINS-mono的估计结果需要按照TUM格式输出 因此要对代码做一些调整。在一下两个文件中修改即可。

- "vins_result_loop" : defined in [path to Vins folder]/pose_graph/src/pose_graph.cpp ; line 156 or 630. The format is timestamp + position(x,y, z) + quaternion(qw, qx, qy, qz).

- "vins_result_no_loop": defined in [path to Vins folder]/vins_estimator/src/utility/visualization.cpp in function pubOdometry(). 

  The format is timestamp + position(x,y, z) + quaternion(qw, qx, qy, qz) + velocity(x,y,z).

代码修改过程：

**visualization.cpp -> Pubodometry ()**

```c++
        // write result to file 为了按照TUM格式输出 调换了位置
        double turetime = header.stamp.toSec();
        ofstream foutC(VINS_RESULT_PATH, ios::app);
        foutC.setf(ios::fixed, ios::floatfield);
        foutC << turetime <<" "
              << estimator.Ps[WINDOW_SIZE].x() << " "
              << estimator.Ps[WINDOW_SIZE].y() << " "
              << estimator.Ps[WINDOW_SIZE].z() << " "
              << tmp_Q.x() << " "
              << tmp_Q.y() << " "
              << tmp_Q.z() << " "
              << tmp_Q.w() << endl; 
```

**pose_graph.cpp **

updatePath()

```c++
    if (SAVE_LOOP_PATH)
    {        
        ofstream loop_path_file("/home/guoben/Documents/output/loop_result.csv", ios::app);
        double turetime = cur_kf->time_stamp;
        loop_path_file.setf(ios::fixed, ios::floatfield);
        loop_path_file  << turetime << " "
             << P.x() << " "
             << P.y() << " "
             << P.z() << " "
             << Q.x() << " "
             << Q.y() << " "
             << Q.z() << " "
             << Q.w() << endl;           
       loop_path_file.close();
    }
 //一共有两处
        if (SAVE_LOOP_PATH)
        {
            ofstream loop_path_file(VINS_RESULT_PATH, ios::app);
            loop_path_file.setf(ios::fixed, ios::floatfield);
            loop_path_file << (*it)->time_stamp << " ";
            loop_path_file  << P.x() << " "
                  << P.y() << " "
                  << P.z() << " "
                  << Q.x() << " "
                  << Q.y() << " "
                  << Q.z() << " "
                  << Q.w() << endl;
            loop_path_file.close();
        }
```



画某一个结果的轨迹

```
evo_traj tum ./loop_result.csv -p --plot_mode=xyz
```

对比结果

```
evo_rpe euroc ./groundtruth/MH_01_data.csv ./result/MH_01/vins_result_loop.csv -va -r full --plot
```

MSCKF

```
  // ofstream foutC("/home/guoben/Documents/output/result_vio.csv", ios::app);
  // foutC.setf(ios::fixed, ios::floatfield);
  // foutC << odom_msg.header.stamp.toSec() << " "
  //       << odom_msg.pose.pose.position.x << " "
  //       << odom_msg.pose.pose.position.y << " "
  //       << odom_msg.pose.pose.position.z << " "
  //       << odom_msg.pose.pose.orientation.x << " "
  //       << odom_msg.pose.pose.orientation.y << " "
  //       << odom_msg.pose.pose.orientation.z << " "
  //       << odom_msg.pose.pose.orientation.w << endl;
```


