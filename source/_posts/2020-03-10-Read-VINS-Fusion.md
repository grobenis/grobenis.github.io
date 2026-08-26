---
layout: post
title: VINS-Fusion 代码阅读
date: 2020-03-10
Author: guoben
categories: 学习
tags: [VINS]
comments: true
toc: true
---

本文记录 VINS-Fusion 源码阅读笔记，重点分析 vins_estimator 节点的程序入口 rosNodeTest.cpp 与 Estimator 类，梳理话题订阅、数据同步线程、滑窗处理及非线性优化等核心流程。

> **读懂源码，方知系统运转之妙**

<!--more-->



## Loop Fusion

Loop Fusion结点包括：



## VINS_estimator

VINS_estimator是VINS_Fusion的节点，其不包含回环检测部分，该节点可以单独对相机进行位姿估计。

### rosNodeTest.cpp

rosNodeTest.cpp是vins_estimator节点的程序入口。主要实现以下函数。

主程序包含以下流程：

1. 读取配置文件参数 readParameter()

2. 订阅了四个话题，分别是imu、双目相机图像以及feature_tracker所提供的跟踪光流点，收到各个话题的消息后执行回调函数，对各个数据进行相应的处理

3. 开启一个新线程sync_process。

   该线程的作用：若图像buffer里面有数据,读入数据并且添加到estimator中。利用图片携带的时间戳信息能够检测两图片是否同步，若两图片的时间戳差距在一定范围内，则添加到estimator中中，否则丢弃两帧图片。

### estimator

VIO系统的整个程序从Estimator estimator开启。

estimator类的定义由estimator.h和estimator.cpp两个文件完成。

包含以下重要的自定义成员：

|              成员              | 功能 |
| :----------------------------: | :--: |
| Feature_Tracker featureTracker |      |
|    FeatureManager f_manager    |      |
|                                |      |
|                                |      |



estimator类中包含两类成员函数：

1. 接口函数

   包括以下8个函数：

   |         函数          | 功能                                                         |
   | :-------------------: | :----------------------------------------------------------- |
   |    initFirstPose()    | 初始化初始位姿                                               |
   |      inputIMU()       | 输入IMU数据                                                  |
   |     inputImage()      | 输入图片数据                                                 |
   |    inputFeature()     | 输入特征                                                     |
   |     ProcessIMU()      | 处理IMU数据，对IMU进行预积分；                               |
   |    ProcessImage()     | 处理相机数据；<br />1. 基于特征点的视差来判断当前帧是否属于关键帧；<br />2. 判断相机到IMU的外参是否有校正，若无则用手眼标定法进行标定,具体在CalibrationExRotation里，此处只标定旋转矩阵，未标定平移矩阵，原因是系统对旋转矩阵较敏感，系统易因为小幅度的角度偏差而崩溃；<br />3. 判断是否有进行初始化;若已完成初始化，则调用optimization( )，用ceres_solver对滑窗进行非线性优化的求解，优化项主要有四项：边缘化残差、 imu残差、相机重投影残差以及相机与Imu间同步时间差的残差项。否则进行相应的初始化过程。<br />4. 本函数中包含一个failureDetection()函数,用于判断系统在一定条件下是否崩溃，比如非线性求解器中的解有大跳动，求解出相机IMU的外参矩阵或IMU偏移等等，系统挂掉就清空状态，重新初始化。 |
   | ProcessMeasurements() | 处理测量值；处理各buffer里的数据，当featureBuf不等于空时，开始进行以下处理（为什么是featureBuf，因为当有图像buffer数据的时候，才会有featuretracker.push(make_pair(t,featureFrame))，即有图像数据后，程序才发给跟踪器叫他产生feature，因此当featureBuf不等于空，所有的buffer，包括imu,图像，都不为空）： |
   |    changeSensrType    | 改变传感器类型，用于确定是否使用IMU，使用单目相机还是双目相机 |

   

2. 内部函数

类的初始化函数Estimator()，由于Estimator类成员内部有两个比较重要的自定义类成员：
（1）Feature_Tracker featuretracker;（以前vins-mono这部分是作为一个独立的Node存在）:
用来对原始图像进行畸变校正，特征点采集，光流跟踪
（2）FeatureManager f_manager;
用来对滑动窗口内所有特征点的管理。
简单设置了一些参数后，系统进入main()。

接着main()与Estimator estimator两者开始发生联系：
main()中estimator.setParameter()开启了滑动窗口估计的一个新线程
由于我们在配置文件中 多线程MULTIPLE_THREAD设置为1，因此当setParameter()时候，就开启了一个Estimator类内的新线程：processMeasurements();


pub VIO的各种话题，包括里程计信息，tf变换，相机姿态，点云信息，并且发布关键帧。

