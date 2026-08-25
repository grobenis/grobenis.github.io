---
layout: post
title: SLAM各算法运行方法与过程
date: 2020-01-15
Author: guoben
categroies: 实验
tags: [SLAM]
comments: true
toc: true
---

本文介绍本人在实践过程中遇到的各个间接法的运行和配置过程。

主要包括以下五种算法:
1. VINS_mono/fusion
2. OKVIS
3. ROVIO
4. VI_ORB-SLAM
5. MSCKF

<!-- more -->


<!--more-->

## VINS_mono
----
## OKVIS
### Run OKVIS
可能需要加入std::ftream
Opencv需要3.4.2或以下版本，需要opencvv模块
Opencv3.4.7没有这个模块

---

## ROVIO
可参考：[该博客]https://www.cnblogs.com/Jessica-jie/p/6607719.html

```
catkin build rovio --cmake-args -DCMAKE_BUILD_TYPE=Release -DMAKE_SCENE=ON
```

### 运行ROVIO

```
$ source devel/setup.bash 
$ roslaunch rovio rovio_node.launch 
```

### 修改代码以输出路径
在发送IMU数据下边添加输出到文件的代码
```
   //把数据写到文档里
    std::ofstream vio_result_file("/home/guoben/Documents/output/vio_result.csv", ios::app);
    vio_result_file << ros::Time(mpFilter_->safe_.t_) << " " 
    << imuOutput_.WrWB()(0) << " " 
    << imuOutput_.WrWB()(1) << " " 
    << imuOutput_.WrWB()(2)  << " " 
    << imuOutput_.qBW().x()  << " " 
    << imuOutput_.qBW().y()<< " " 
    << imuOutput_.qBW().z() << " " 
    << -imuOutput_.qBW().w() << std::endl;
    vio_result_file.close();
```

---
## VI-ORB_SLAM
[ LearnVIORB 的代码地址](https://github.com/jingpang/LearnVIORB)
代码运行方法
轨迹生成
输出位置位于 System.cc	

---
## MSCKF
### 运行方法
```
roslaunch msckf_vio msckf_vio_euroc.launch 
rosrun rviz rviz -d ~/Project/msckf_vio_workspace/src/msckf_vio/rviz/rviz_euroc_config.rviz   //rviz显示模型
  rosbag play /home/wj/Downloads/dataset/EuRoC/ROS_bag/MH_05_difficult.bag
```

**NOTE**
The software does not run on EuRoC `MH_01_easy.bag` and `MH_02_easy.bag`. As explained in the README, the algorithm requires the sensor to start from staic in order to initialize the orientation and IMU bias. unfortunately, `MH_01_easy.bag` and `MH_02_easy.bag` do not have the initial static period.
