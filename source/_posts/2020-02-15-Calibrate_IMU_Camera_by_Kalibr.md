---
layout: post
title: 利用Kalibr标定双目相机与IMU
date: 2020-02-15
Author: guoben
categories: 实验
tags: [ROS,IMU,Kalibr]
comments: true
toc: true
---

本文介绍如何利用Kalibr标定工具进行双目相机与IMU的联合标定。主要过程包括以下四步：

1. 生成标定板
2. 标定双目相机
3. 标定IMU
4. 联合标定



<!-- more -->


<!--more-->

## 1. 生成标定板

使用AprilTag

```
rosrun kalibr kalibr_create_target_pdf --type apriltag --nx 6 --ny 6 --tsize 0.002 --tspace 0.3
```



## 2. 标定双目相机

降低帧率

```
rosrun topic_tools throttle messages /l_cam/image_raw 4 /left
rosrun topic_tools throttle messages /r_cam/image_raw 4 /right
```

```
advertised as /left //出现时说明将帧成功
```

录制bag包

```
    rosbag record /left /right >mycamera.bag
```

### 遇到的错误

#### ImportError: cannot import name NavigationToolbar2Wx

```
/home/cjn/kalibr/src/kalibr/Schweizer-Messer/sm_python/python/sm/PlotCollection.py
解决：将 PlotCollection.py 中的NavigationToolbar2Wx 改为 NavigationToolbar2WxAgg
```

####  ImportError: No module named igraph

```
sudo apt-get install python2.7-igraph
```



#### kalibr标定时出现：ImportError: No module named Image.

解决方法： 在kalibr_workspace/aslam_offline_calibration/kalibr/python/kalibr_camera_calibration/MulticamGraph.py中
将import Image改为from PIL import Image



```
rosrun kalibr kalibr_calibrate_cameras --bag '/home/guoben/stereocam.bag' --topics /left /right --models pinhole-radtan pinhole-radtan --target '/home/guoben/Project/Kalibr_ws/april_6x6_80x80cm.yaml' --show-extraction --approx-sync 0.1
```

注意事项：

* 标定的时候图中不能存在两个标定板
* 起始画面和终止画面要稳定

## 3. 标定IMU

参考：[IMU噪声标定——加速度计和陀螺仪的白噪声和零偏不稳定性](https://blog.csdn.net/learning_tortosie/article/details/89878769)

//录制bag文件

1. collect the data while the IMU is Stationary, with a two hours duration;

```
rosbag	record /imu0
```

有Code_utils和imu_utils两个包 先编译code_utils再编译imu_tils



得到的imu.yaml

```yaml
type: IMU
name: ICM20602
Gyr:
   unit: " rad/s"
   avg-axis:
      gyr_n: 1.4127871720120859e+02
      gyr_w: 4.8477797168896648e-03
   x-axis:
      gyr_n: 3.9615886574940606e+02
      gyr_w: 4.8477797168896648e-03
   y-axis:
      gyr_n: 1.5284722859858114e+01
      gyr_w: 4.8477797168896648e-03
   z-axis:
      gyr_n: 1.2392562994361640e+01
      gyr_w: 4.8477797168896648e-03
Acc:
   unit: " m/s^2"
   avg-axis:
      acc_n: 3.8264508828802807e-01
      acc_w: 1.0613073078261251e-02
   x-axis:
      acc_n: 3.6962189636668691e-01
      acc_w: 1.0916554449621266e-02
   y-axis:
      acc_n: 4.6707198750779616e-01
      acc_w: 1.0721472803944067e-02
   z-axis:
      acc_n: 3.1124138098960102e-01
      acc_w: 1.0201191981218414e-02
```

修改为如下样式：

```yaml
rostopic: /imu0
update_rate: 100.0 #Hz
 
accelerometer_noise_density: 3.8264508828802807e-01 #continous
accelerometer_random_walk: 1.0613073078261251e-02 
gyroscope_noise_density: 1.4127871720120859e+02 #continous
gyroscope_random_walk: 4.8477797168896648e-03
```



## 4. 录制数据包

沿着3个轴旋转平移三次

## 5. 联合标定

准备好四个文件

1. 标定半文件
2. 相机参数文件
3. imu参数文件
4. 数据bag文件

```
rosrun kalibr kalibr_calibrate_imu_camera --target april_6x6_80x80cm.yaml --cam stereocam.yaml --imu ICM20602.yaml --bag camera_imu.bag --timeoffset-padding 0.1
```

## 6. 标定结果

得到结果为camchain.yaml

```YAML
cam0:
  T_cam_imu: # 从IMU到相机坐标的转换
  - [0.08233179976406399, -0.9949127683235393, -0.05805220214946505, -0.008744023342066004]
  - [-0.9959106050536686, -0.08430878258416843, 0.032466843406961834, 0.07000917129335886]
  - [-0.03719598754229868, 0.055141750117018384, -0.9977854708827878, -0.11902680705823296]
  - [0.0, 0.0, 0.0, 1.0]
  cam_overlaps: [1]
  camera_model: pinhole
  distortion_coeffs: [-0.4274960254764774, 0.1522753401860188, 0.022086313718892994,
    -0.0007250205609533983] #失真模型的参数向量
  distortion_model: radtan 
  intrinsics: [576.2948258096362, 570.5120047531799, 290.9276492936449, 165.99488000803987] #相机内参 之前标好的
  resolution: [640, 480] #分辨率
  rostopic: /l_cam/image_raw #话题
  timeshift_cam_imu: -0.04319840825131607 #漂移
cam1: 
  T_cam_imu: # 从IMU到相机坐标的转换
  - [0.0894795247331801, -0.9911722483784674, 0.0978314300104943, -0.06676213145949367]
  - [-0.995095690056223, -0.08480851440432002, 0.05091250844401363, 0.06960856622513922]
  - [-0.04216612722380045, -0.10190726141402426, -0.9938998580269747, -0.12389393733183268]
  - [0.0, 0.0, 0.0, 1.0]
  T_cn_cnm1:
  - [0.9878176058814627, -0.002372804306504643, -0.1555980311904324, -0.07647885002996721]
  - [-0.000506528488511444, 0.9998294218114983, -0.01846268422998622, -0.0025906464811484946]
  - [0.155615297896788, 0.018316579369764666, 0.9876479038507021, -0.0062589855841411746]
  - [0.0, 0.0, 0.0, 1.0]
  cam_overlaps: [0]
  camera_model: pinhole
  distortion_coeffs: [-0.4358292770104687, 0.13856343257725542, 0.01867787729653694,
    -0.011189753016360725]
  distortion_model: radtan
  intrinsics: [572.0873971077864, 571.5888157262697, 349.04660762135626, 174.35778659111406]
  resolution: [640, 480]
  rostopic: /r_cam/image_raw
  timeshift_cam_imu: -0.002440062477866302

```



