---
layout: post
title: 发布IMU信息到ROS系统中
date: 2020-02-15
Author: guoben
categories: 实验
tags: [ROS,IMU]
comments: true
toc: true
---

以下记录是在调试树莓派3b中得到的经验



​	本文记录调试树莓派3b中得到的经验，如何把IMU信息发布到ROS系统中。

本文记录在树莓派 3B 上把 IMU 信息发布到 ROS 系统的调试经验，先介绍 sensor_msgs/Imu 消息结构，再整理 WiringPi 安装、I2C 使能、创建 ROS 包等常见问题及解决办法。

> **消息结构清晰，数据方可流动**

<!-- more -->


<!--more-->

## 发布IMU信息到ROS

## sensor_msgs/Imu.msg

```
Header header
 
geometry_msgs/Quaternion orientation
float64[9] orientation_covariance # Row major about x, y, z axes
 
geometry_msgs/Vector3 angular_velocity
float64[9] angular_velocity_covariance # Row major about x, y, z axes
 
geometry_msgs/Vector3 linear_acceleration
float64[9] linear_acceleration_covariance # Row major x, y z
```

其中，文档描述了Imu的消息结构，其中姿态（orientation）类型为四元数（geometry_msgs/Quaternion）；角速度（angular_velocity）和线加速度（linear_acceleration）的类型为三维向量（geometry_msgs/Vector3）。



## 遇到的一些问题

1. WiringPi未安装

   ```
   git clone WiringPi
   cd WiringPi
   sudo chmod 771 ./build
   sudo ./build
   ```

2. I2C device

   ```
   sudo raspi-config
   ```

3. 创建ros包

   ```
   catkin_create_pkg beginner_tutorials std_msgs rospy roscpp
   ```

   然后修改XML和CMakeLists.txt

