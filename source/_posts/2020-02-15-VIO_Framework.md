---
layout: post
title: VIO主流框架
date: 2020-02-15
Author: guoben
tags: [VIO,VINS]
comments: true
toc: true
---
本节主要说明当前主流的VIO算法流程。课程来源于[B站](https://www.bilibili.com/video/av44472237?t=297)。

需要理解约束关系的确定，以及确立相应约束的三个要素

<!-- more -->


<!--more-->

## Bundle Adjustment

定义：通过优化相机位姿和特征点的空间位置，使得每条光束都能打到光心；

作用：BA是SLAM后端的核心，SLAM其实就是一个BA问题，理解BA对于分析现有问题和建模新问题等都很有帮助；但是理解BA并不表示SLAM效果就好，SLAM最终结果的好坏很大取决于数据关联的好坏；

**核心**：误差项、优化变量、协方差

难点：李群、李代数、四元数的Jacobian，一通则百通，也可借鉴g2o写好的点和边，但要注意坐标系转换关系。

### SLAM问题的整体求解思路

![image-20220713225528933](image-20220713225528933.png)

### 前置知识

#### 高斯牛顿法

目标函数：
$$
\Delta x* = \arg\min_x||e(x+\Delta x||^2_P\\=\min_x e(x+|\Delta x)^TP^{-1} e(x+\Delta x)
$$
误差项: 
$$
e(x+\Delta x)=e(x)+J(x)\Delta x
$$

令目标函数关于$\Delta x$的导数为0，得到高斯 牛顿方程，即增量方程：
$$
J^T P^{-1}\Delta x = -J^TP^{-1}e
$$


### 误差项设置

#### 一次观测

![image-20220713225233498](image-20220713225233498.png)

其Jacobian矩阵如下：

![image-20220713225308322](image-20220713225308322.png)

得到相应的Hession矩阵如下所示：

![image-20220713225407060](image-20220713225407060.png)

#### 多次观测

![image-20220713225824397](image-20220713225824397.png)

#### 逆深度+VIO

![image-20220713225908622](image-20220713225908622.png)

举例，其中一个T1T1的小块的数学形式如下所示：

![image-20220713234040614](image-20220713234040614.png)

## 因子图

因子图中方块表示因子，圆圈表示优化变量。一个因子表示一个约束，即表示一个误差项，与之相连的圆圈是与该误差项相关的优化变量。 

### 视觉约束

![image-20220713234517013](image-20220713234517013.png)

### IMU约束

 

#### EKF滤波和优化 

1. EKF铝箔相当于之迭代一次的优化，区别是滤波仅考虑上一帧的影响，而优化则考虑所有帧的影响
2. 多次优化精度比滤波高，但效率低于滤波，因优化可以迭代多次，不断优化线性化点，是误差最小

#### IMU预积分

1. 积分下一个时刻的PVQ作为视觉初始值
2. 预计分相邻帧的PVQ变化量，作为IMU的约束
3. 计算IMU误差的协方差和jacobian

![image-20191202112248399](./images/SLAM/image-20191202112248399.png)



## VIO分类

1. 将视觉约束就加到联合优化是紧耦合

2. 将视觉约束后的位姿加入到联合优化是松耦合

![image-20191202135710367](/images/SLAM/image-20191202135710367.png)


### MSCKF
具体流程如下所示:
1. 初始化
2. IMU预测
3. 视觉跟踪
4. 视觉增广
5. 视觉更新—选老点或者看不见的点
6. 视觉更新—边缘化
7. 剔除老帧

![image-20191202142230678](/images/SLAM/image-20191202142230678.png)

误差状态向量
$$
\hat{X_k}^{(15+6N)\times1} = [\hat{X_{IMU_k}} \delta \theta_{C_1} \ce{G}\hat{p}_{C_1} …\ce{^{G}\hat{p}_{c_N} \ce{G}\hat{p}_{C_N}}]
$$

$$
\hat{X}_{IMU}_k^{15\times1}=[\delta\theta_I  \hat{b_g}\space\ce{G}\hat{v}_I\hat{b}_a\space \ce{G}\hat{p}_I ]^T
$$

> 每得到一个新图像以后需要对协方差矩阵做一个增广

<!-- 源文件缺失，已注释 -->![MSCKF对协方差矩阵的增广](/images/SLAM/主流框架推导/MSCKF对协方差矩阵的增广.png)<!-- / -->

![image-20191202144228268](/images/SLAM/MSCKF滤波.png)



> 成熟的路标点 表示窗口内各帧都看得到的点

**因子图**

![image-20191202145520572](/images/SLAM/MSCKF因子图.png)

> Tbc表示IMU与相机间的转换矩阵

![image-20191202145642717](/images/SLAM/边缘化1.png)

![image-20191202145714060](/images/SLAM/边缘化2.png)

路标点边缘化完后就可以了

**第j个路标点的所有视觉误差为**
$$
r^{2M\times1}\cong H_x^{2M\times(15+6N)\tilde{X}^{(15+N)\times1}}+H_f^{2M\times3}\ce{G}\hat{p}_{f_j}^{3\times1}+n^{2M\times1}
$$
![image-20191202150951897](/images/SLAM/MSCKF因子图3.png)

将r投影到Hf的左零空间，想党羽对路标点进行边缘化，将边缘化约束来优化共视帧。
$$
r_0^(2M-3M_L)\times1=A^Tr^2M\times1\cong A^TH_{x}^{2M\times(15+6N)}\tilde{X}^{(15+6N)\times1}+A^Tn^(2M\times1)
$$

### ROVIO

> 复杂 不常用

流程

1. IMU预测
2. 视觉更新
3. IEKF
4. 相机模型
5. 像素坐标校正
6. 光度误差
7. QR分解
8. Paych提取及Warp计算
9. 路标点质量评价及维护

![image-20191202152338738](/images/SLAM/ROVIO流程图.png)

> ROVIO使用光度误差
>
> ![image-20191202152951499](/images/SLAM/ROVIO状态向量.png)

> > ROVIO将路标点包含到状态向量中。有因将路标点表征在当前帧的坐标系下，有范围限制，因此对其进行归一化得到无约束的状态量—方向向量Bearing Vector

ROVIO的创新点如下所示：

ROVIO中，路标点使用当前帧下的归一化相机系坐标Pc和你深度表示，并作为状态向量进行预测和更新。参数化不同导致预测和更新的细节不同，但总体还是EKF五大公式。又因Pc有边界约束，因此引入了Bearing  Vector老了使得Pc平滑可导

![image-20191202153359978](/images/SLAM/ROVIO基本框架.png)

状态向量：当前帧的PVQB和路标点( mu,p)

![image-20191202154121085](/images/SLAM/ROVIO状态向量.png)

因子图如下

![image-20191202154600998](/images/SLAM/ROVIO因子图.png)

### VI-ORB

#### 流程图

![image-20191202160942722](/images/SLAM/VIORB流程图.png)

Tracklocal map：仅优化当前帧

![image-20191202160729305](/images/SLAM/VIORB因子图.png)

Local Map：优化华创内的所有帧的PVQB和路标点

![image-20191202161217237](/images/SLAM/VIORB_LocalBA因子图.png)



### ICE-BA

**增量式BA**，误差为IMU和视觉，LBA为滑窗优化，GBA为所有KF优化，速度很快。

<!-- 源文件缺失，已注释 -->![image-20191202161618980](/home/guoben/ICE-BA因子图.png)<!-- / -->

ICE-BA认为在建立增量方程时，对之前已经算过的且不变的那些状态向量没必要重新线性化（线性化及计算Jacobian），因为即使重新计算Jacobian也没什么变化。另外，也没必要对整体[H|b]矩阵进行消元，而是只对变化的进行更新。最后只计算变化的路标点即可。对于没有变化的状态向量的临时值则一直保存下来，避免重新计算。

总结而言，在ICE-BA中更新Factor有三种情况：

1. 该Factor在本次迭代中没有变化，则不更新；
2. 该Factor是新Factor，则在原来基础上+=新Factor。如新观察到一个新的路标点，则对此新路标点的观测约束就是一个新的Factor；
3. 该Factor已存在但需要更新，则先减去旧Factor，再架上新Factor。

![image-20191202162754352](/images/SLAM/ICEBA_LocalBA与GlobalBA.png)



### VINS论文推导与代码解析

#### 整体框架

 ![image-20220714081217013](image-20220714081217013.png)



![image-20220714080740464](image-20220714080740464.png)

1. 黄色为IMU帧间约束（PVQBaBg 15×1）
2. 蓝色为视觉重投影误差约束（2×1）
3. 绿色为闭环帧，用来计算相对位姿，用于闭环优化时使用

VINS在前端通过光流法进行跟踪，首先检测Harris角点，跟踪相邻帧的角点，

#### 优化向量

> 包括滑动窗口内的n个相机状态PVQB、Camera到IMU的外参、m个3D点的逆深度：

$$
X=[x_0\,x_1\,...x_n,x_c^b,\lambda_0,\lambda_1,...\lambda_m]
$$

![image-20191202155816170](/images/SLAM/VINS因子图.png)

>框表示滑动窗口，T中的R、t表示P、Q ；M中的是v和b；lambda表示路标的逆深度；（外参没有考虑）



