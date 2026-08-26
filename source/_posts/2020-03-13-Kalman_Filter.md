---
layout: post
title: Kalman 滤波器学习
description: "概率图+时间=动态系统"
date: 2020-03-14
Author: guoben
categories: 学习
tags: [Kalman滤波器]
comments: true
toc: true
---

概率图+时间=动态系统

​	对概率图模型考虑其时间序列，可以得到动态系统。根据动态系统的隐状态的连续性和分布可以把系统大致分为三类：

1. 若隐状态离散，不要求分布，则为隐马尔可夫模型
2. 如果隐状态连续、线性且服从高斯分布，则为Kalman滤波器（线性高斯模型）
3. 如果隐状态连续且非线性，作为得到粒子滤波器

本节主要来介绍kalman滤波器。

本文系统学习卡尔曼滤波器：从动态系统分类引出线性高斯系统，给出 KF 的前提假设与算法流程，并结合代码样例与基于后验概率的推导加深理解，最后介绍扩展卡尔曼滤波（EKF）的应用场景与局限性及其与 HMM 的关系。

> **预测加修正，噪声终让路**

<!--more-->

## Kalman滤波器

### 简述

卡尔曼滤波器是由Swerling（1958）和Kalman（1960）作为线性高斯系统中的预测和滤波技术而发明的，使用矩来定义的。KF实现了对连续状态的置信度计算。KF用矩参数来表示置信度：在时刻k，置信度用均值$ \mu_k $（一阶矩）和方差$ \sum _{k-1} $（二阶矩）表达。

卡尔曼滤波建立在线性代数和隐马尔可夫模型上。其基本动态系统可以用一个马尔可夫链来表示，该马尔可夫链建立在一个线性高斯系统上。系统的状态可以用一个元素为实数的向量表示。随着离散时间的每一个增加，这个线性算子就会作用在当前状态上，产生一个新的状态，并也会带入一些噪声，同时系统的一些已知的控制器的控制信息也会被加入。同时，另一个受噪声干扰的线性算子产生出这些隐含状态的可见输出。

使后验为高斯分布的前提，同时也是KF的特性：
       （1）状态转移必须是带有随机高斯噪声的参数的线性函数。
       （2）测量也与带有高斯噪声的自变量呈线性关系。
       （3）初始置信度必须是正态分布的。

这三个假设足以确保后验在任何时刻`t`总符合高斯分布。

根据线性高斯系统可以得到**卡尔曼滤波器**。 

卡尔曼滤波器的状态由以下两个变量表示：

1. $\hat{x}_k$，在时刻k的状态的估计；
2. $\Sigma_{k}$，后验估计误差协方差矩阵，度量估计值的精确程度。

### 线性高斯系统

线性高斯系统是说，运动方程和观测方程可以由线性方程来描述：
$$
\begin{cases}x_k=A_kx_{k-1}+u_k+w_k \quad k=1,...,N\\
z_k=C_kx_k+v_k
\end{cases}
$$
<!-- 本地 Typora 路径源文件缺失，已注释 -->

#### 系统模型

$$
x_k=A_kx_{k-1}+u_k+w_k \quad k=1,...,N
$$

其中,$A_k$是作用在$x_{k-1}$的状态变换模型（矩阵/矢量）。

$w_k$是过程噪声,满足$w_k\sim N(0,Q)$

#### 观测模型

$$
z_k = C_kx_k+v_k
$$

其中$C_k$是观测模型，能把真实状态空间映射成观测空间。并假设了所有的状态和噪声均满足高斯分布。

$v_k$观测噪声服从零均值高斯分布：即$.v_k\sim N(0,R)$。

**线性**

线性系统中的线性体现在以下两个方面:

1. $X_k=A*X_{k-1}+B+\epsilon,\epsilon\sim N(0,Q)$
2. $Z_k=C*X_k+D+\delta,\epsilon \sim N(0,R)$

两个条件服从高斯分布：
$$
P(X_k|X_{k-1})\sim N(A*X_{k-1}+B,Q)
$$

$$
P(Z_k|X_k)\sim N(C*X_k+D,R)
$$

可以系统的初始状态：
$$
X_1\sim N(\mu_1,\Sigma_1)
$$


$$
\begin{equation}
\left\{
	\begin{array}{lr}
		P(X_k|X_{k-1})\sim N(A*X_{k-1}+B,Q)\\
		P(Z_k|X_k)\sim N(C*X_k+D,R)\\
		P(Z_1)=N(\mu_1,\Sigma_1)
	\end{array}
\right.
\end{equation}
$$
总共的参数表如下：

$$
\theta = (A,B,C,D,Q,R,\mu_1,\Sigma_1)
$$

卡尔曼滤波是一种递归的估计，即只要获知上一时刻状态的估计值以及当前状态的观测值就可以计算出当前状态的估计值，因此不需要记录观测或者估计的历史信息。卡尔曼滤波器与大多数滤波器不同之处，在于它是一种纯粹的时域滤波器，它不需要像低通滤波器等频域滤波器那样，需要在频域设计再转换到时域实现。


### 算法

卡尔曼滤波器的操作包括两个阶段：**预测**与**更新**。

1. 预测阶段，滤波器使用上一状态的估计，做出对当前状态的预测。
2. 更新阶段，滤波器利用对当前状态的观测值优化在预测阶段获得的预测值，以获得一个更精确的新估计值。

**输入：**系统在`t-1`时刻状态的置信度（正态分布，均值和方差用$\mu_{t-1}$和$\Sigma_{t-1}$）; 输入的控制向量$u_t$和测量向量$z_t$。

**输出：**系统t时刻的状态的置信度$bel(x_t)$，均值向量$\mu_t$，方差$\Sigma_t$。

**伪代码**

**Algorithm Kalman_filter** ($\mu_{t-1}$,$\Sigma_{t-1}$,$\mu_t$,$z_t$)

1. $\hat\mu_t = A_t\mu_{t-1}+B_tu_t$
2. $\hat\sum_t =A_t\sum_{t-1}A^T_t+R_t$
3. $K_t=\hat\sum_tC^T_t(C_t\hat\sum_tC^T_t+Q_t)^{-1}$
4. $\mu_t=\hat\mu_t+K_t(z_t-C_t\hat\mu_t)$
5. $\sum_t=(I-K_tC_t)\hat\sum_t$

**return** $\mu_t$, $ \sum_t$

### 代码样例

~~~matlab
function [ predictx, predicty, state, param ] = kalmanFilter( t, x, y, state, param, previous_t )
% 卡尔曼滤波器
% 输入：当前时间t，位置，状态，参数，前一帧的时间t-1
% UNTITLED Summary of this function goes here
%   假设状态为四维:[p_x,p_y,v_x,v_y]
%   Four dimensional state: position_x, position_y, velocity_x, velocity_y
 
    %% Place parameters like covarainces, etc. here:
    % P = eye(4)
    % R = eye(2)
 
    % Check if the first time running this function
    % 初始化
    if previous_t<0
        state = [x, y, 0, 0];
        param.P = 0.1 * eye(4);
        predictx = x;
        predicty = y;
        return;
    end
    %% Naive estimate 朴素估计
%     % As an example, here is a Naive estimate without a Kalman filter
%     % You should replace this code
%     vx = (x - state(1)) / (t - previous_t);
%     vy = (y - state(2)) / (t - previous_t);
%     % Predict 330ms into the future
%     predictx = x + vx * 0.330;
%     predicty = y + vy * 0.330;
%     % State is a four dimensional element
%     state = [x, y, vx, vy];
    %% TODO: Add Kalman filter updates
    %% 当前目的：更新kalman滤波器
    % 1. 计算时间间隔
    dt = t - previous_t; % Time interval
    
    % PREDICT
    % 2. 预测
    A = [1 0 dt 0; % Transform matrix A
         0 1 0 dt;
         0 0 1  0;
         0 0 0  1];
     
    C = [1 0 0 0; % Observation matrix C
         0 1 0 0];
     
    z_t = [x, y]'; % Measurement data
    
    % Q = 0.005 * eye(4);
    Q = [dt^2  0        0       0; % System (Motion) noise covariance
         0        dt^2  0       0;
         0        0        1       0;
         0        0        0       1];
           
    R = 0.005 * eye(2); % Measurement noise covariance
    
    P = A * param.P * transpose(A) + Q; % Prior estimation covariance
    
    % UPDATE
    % 3. 更新
    K = P * transpose(C) * inv(R + C * P * transpose(C)); % Kalman gain
    state = (A * (state') + K * (z_t - C * A * (state')))'; % Posterior state estimation
    param.P = P - K * C * P; % Posterior estimation covariance
    
    % Predict 330ms into the future
    predictx = state(1) + state(3) * 0.330;
    predicty = state(2) + state(4) * 0.330;
end
~~~



### 基于后验概率推导Kalman滤波器·

可以看作是一个Filter问题的求解过程
$$
P(X_t|z_1,z_2,...z_t)\propto P(z_1,z_2,...z_t,X_t)\\=P(z_t|z_1,z_2,...z_{t-1},X_t)*P(z_1,z_2,...z_{t-1},X_t)\\
=P(z_t|X_t)P(z_1,...,z_{t-1},X_t)\\
=P(z_t|X_t)P(X_t|z_1,...,z_{t-1})P(z_1,...,z_{t-1})\\
\propto P(z_t|X_t)P(X_t|z_1,...,z_{t-1})\\
$$

其中：
$$
P(X_t|z_1,...,z_{t-1})
=\int_{X_{t-1}}P(X_t,X_{t-1}|z_1,...,z_{t-1})dz_{t-1}\\
=\int_{X_{t-1}}P(X_t|X_{t-1},z_1,...,z_{t-1})P(X_{t-1}|z_1,...,z_{t-1})dz_{t-1}
\\=\int_{X_{t-1}}P(X_t|X_{t-1})P(X_{t-1}|z_1,...,z_{t-1})dz_{t-1}
$$


 基于概率的推导步骤：

* t=1,
  $$
  \begin{equation}
  \left \{
  	\begin{array}{lr}
  	P(X_1|z_1)\rarr update\\
  	P(X_2|z_1)\rarr prediction
  	\end{array}
  \right.
  \end{equation}
  $$
  
* t=2,
  $$
  \begin{equation}
  \left \{
  	\begin{array}{lr}
  	P(X_2|z_1,z_2)\rarr update\\
  	P(X_3|z_1,z_2)\rarr prediction
  	\end{array}
  \right.
  \end{equation}
  $$

* t=T,
  $$
  \begin{equation}
  \left \{
  	\begin{array}{lr}
  	P(X_T|z_1,z_2...z_T)\rarr update\\
  	P(X_{T+1}|z_1,z_2,...,z_T)\rarr prediction
  	\end{array}
  \right.
  \end{equation}
  $$

### Kalman滤波器与HMM之间的关系

本节[出处](https://www.cnblogs.com/pinking/p/9201405.html)。

Kalman与HMM的关系，事实上，他们解决的问题模型都是如上图所示，只不过一个是利用最小均方误差准则进行估计，一个是利用最大后验进行估计。事实上，HMM的预测问题中，就是一个最大的后验概率作为其似然函数，然后通过viterbi算法解的这个似然函数。



## 拓展Kalman滤波器

核心思想：把卡尔曼滤波器的结果拓展到非线性系统中

做法：在某个点附近考虑运动方程以及观测方程的一阶泰勒展开，只保留一阶项，即闲下来部分，然后按照线性系统进行推导。

卡尔曼滤波器给出了在线性化之后，状态变量分布的变化过程。在线性系统和高斯噪声下，卡尔曼滤波器给出了无偏最优估计。而在SLAM 这种非线性的情况下，它给出了单次线性近似下最大后验估计（MAP）。

### EKF的应用

EKF在SLAM中有着广泛的应用

### EKF的局限性

1. EKF假设了马尔可夫性，即k时刻的状态只与k-1时刻相关，而与k-1之前的状态和观测都无关。但在视觉里程计中，只考虑相邻两帧的关系会累积误差。如果有回环检测的，滤波器就很难处理这种情况。
2. 与非线性优化方法相比，EKF滤波器仅在$\hat{x}_{k-1}$处做了一次线性化，然后直接根据这次线性化结果计算后验概率。。这相当于在说，我们认为该点处的线性化近似，在后验概率处仍然是有效的。而实际上，当我们离开工作点较远的时候，一阶泰勒展开并不一定能够近似整个函数，这取决于运动模型和观测模型的非线性情况。如果它们有强烈的非线性，那线性近似就只在很小范围内成立，不能认为在
   很远的地方仍能用线性来近似。这就是EKF 的非线性误差，是它的主要问题所在。在优化问题中，尽管我们也做一阶（最速下降）或二阶（G-N 或L-M）的近似，但每迭代一次，状态估计发生改变之后，我们会重新对新的估计点做泰勒展开，而不像EKF 那样只在固定点上做一次泰勒展开。这就导致优化方法适用范围更广，则在状态变化较大时亦能适用。
3. 从程序实现上来说，EKF 需要存储状态量的均值和方差，并对它们进行维护和更新。如果把路标也放进状态的话，由于视觉SLAM 中路标数量很大，这个存储量是相当可观的，且与状态量呈平方增长（因为要存储协方差矩阵）。因此，EKF-SLAM 普遍被认为不可适用于大型场景。

