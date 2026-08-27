---
title: OpenCV 重要函数
description: "本节用来总结SLAM学习过程中，用到的重要的opencv函数"
reward: true
copyright: true
Author: Grobenis
date: 2020-04-14 20:43:39
categories: [学习]
tags: [OpenCV, SLAM]
---

本节用来总结SLAM学习过程中，用到的重要的opencv函数

本文总结 SLAM 学习中常用的 OpenCV 函数，重点介绍 calcOpticalFlowPyrLK 金字塔 LK 光流函数的参数含义与用法，并补充 circle 画圆与 goodFeaturesToTrack 角点检测函数的参数说明及 VINS-Fusion 应用示例。

> **熟悉参数含义，SLAM 开发得心应手**

<!--More-->

## CalcopticalFlowPyrLK()

### 功能

使用具有金字塔的迭代Lucas-Kanade方法计算稀疏特征集的光流。

```C++
void cv::calcOpticalFlowPyrLK	(	
    InputArray 	prevImg,
    InputArray 	nextImg,
    InputArray 	prevPts,
    InputOutputArray 	nextPts,
    OutputArray 	status,
    OutputArray 	err,
    Size 	winSize = Size(21, 21),
    int 	maxLevel = 3,
    TermCriteria 	criteria = TermCriteria(TermCriteria::COUNT+TermCriteria::EPS, 30, 0.01),
    int 	flags = 0,
    double 	minEigThreshold = 1e-4 
)		
```

**参数：**

* prevImg ：buildOpticalFlowPyramid构造的第一个8位输入图像或金字塔。
* nextImg ：与prevImg相同大小和相同类型的第二个输入图像或金字塔
* prevPts ：需要找到流的2D点的矢量(vector of 2D points for which the flow needs to be found;);点坐标必须是单精度浮点数。
* nextPts ：输出二维点的矢量（具有单精度浮点坐标），包含第二图像中输入特征的计算新位置;当传递OPTFLOW_USE_INITIAL_FLOW标志时，向量必须与输入中的大小相同。
* status ：输出状态向量（无符号字符）;如果找到相应特征的流，则向量的每个元素设置为1，否则设置为0。
* err ：输出错误的矢量; 向量的每个元素都设置为相应特征的错误，错误度量的类型可以在flags参数中设置; 如果未找到流，则未定义错误（使用status参数查找此类情况）。
* winSize ：每个金字塔等级的搜索窗口的winSize大小。
* maxLevel ：基于0的最大金字塔等级数;如果设置为0，则不使用金字塔（单级），如果设置为1，则使用两个级别，依此类推;如果将金字塔传递给输入，那么算法将使用与金字塔一样多的级别，但不超过maxLevel。
* criteria ：参数，指定迭代搜索算法的终止条件（在指定的最大迭代次数criteria.maxCount之后或当搜索窗口移动小于criteria.epsilon时）。
* flags ：操作标志：
* OPTFLOW_USE_INITIAL_FLOW：使用初始估计，存储在nextPts中;如果未设置标志，则将prevPts复制到nextPts并将其视为初始估计。
* OPTFLOW_LK_GET_MIN_EIGENVALS：使用最小特征值作为误差测量（参见minEigThreshold描述）;如果没有设置标志，则将原稿周围的色块和移动点之间的L1距离除以窗口中的像素数，用作误差测量。
* minEigThreshold ：算法计算光流方程的2x2正常矩阵的最小特征值，除以窗口中的像素数;如果此值小于minEigThreshold，则过滤掉相应的功能并且不处理其流程，因此它允许删除坏点并获得性能提升。
  该函数实现了金字塔中Lucas-Kanade光流的稀疏迭代版本。

## cv::circle()

### 功能：画圆

```C++
void circle(CV_IN_OUT Mat& img, Point center, int radius, const Scalar& color, int thickness=1, int lineType=8, int shift=0); 
```

### 参数

* img：图像，单通道多通道都行，不需要特殊要求
* center：画圆的圆心坐标
* radius：圆的半径
* color：设定圆的颜色，比如用CV_RGB(255, 0,0)设置为红色， CV_RGB(255, 255,255)设置为白色，CV_RGB(0, 0,0)设置为黑色 
* thickness：为设置圆线条的粗细，值越大则线条越粗，为负数则是填充效果

## goodFeaturesToTrack

  *_image：8位或32位浮点型输入图像，单通道*

  *_corners：保存检测出的角点*

  *maxCorners：角点数目最大值，如果实际检测的角点超过此值，则只返回前maxCorners个强角点*

  *qualityLevel：角点的品质因子*

  *minDistance：对于初选出的角点而言，如果在其周围minDistance范围内存在其他更强角点，则将此角点删除*

  *_mask：指定感兴趣区，如不需在整幅图上寻找角点，则用此参数指定ROI*

  *blockSize：计算协方差矩阵时的窗口大小*

  *useHarrisDetector：指示是否使用Harris角点检测，如不指定，则计算shi-tomasi角点*

  harrisK：Harris角点检测需要的k值 

```C++
cv::goodFeaturesToTrack(cur_img, n_pts, MAX_CNT - cur_pts.size(), 0.01, MIN_DIST, mask); //VINS_Fusion中的应用
```

