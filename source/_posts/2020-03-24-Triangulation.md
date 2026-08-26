---
title: SLAM 中的三角测量
description: "三角测量是SLAM中，利用相机运动估计特征点空间位置的过程。"
Author: Grobenis
date: 2020-03-24 16:34:07
categories: 学习
tags: [SLAM,三角化,面试]
---

三角测量是SLAM中，利用相机运动估计特征点空间位置的过程。

本节旨在解决以下问题：

1. 三角测量的概念
2. 三角测量的过程及代码实现；
3. 三角测量有哪些不确定性
4. 如何提高三角测量的精度

本文学习 SLAM 中的三角测量，即已知相机运动 R、t 后，利用两帧特征点的归一化坐标求解地图点的深度与空间位置。文章给出三角化的数学推导与基于 OpenCV 的代码实现，并分析了三角化的不确定性来源以及提高精度的措施。

> **三角测量，由视差求深度**

<!--More-->

## 1. 概念

在SLAM中，利用对极几何约束估计相机运动之后，我们还需要通过三角测量来估计地图点的深度。三角测量（三角化）指的是，通过在两处观测同一个点的夹角，从而确定该点的距离。

SLAM中主要用三角化来估计像素点的距离。

![](三角测量.png)

## 2. 过程

按照对极几何的定义，设$x_1,x_2$为两个特征点的归一化坐标，那么他们满足：
$$
s_1x_1=s_2Rx_2+t.
$$
经过对极几何之后，已得到了运动$R,t$，需要求解两个特征点的深度$s_1$,$s_2$。

两个深度可以分开算。若先算$s_2$,那么对上市两个做成一个$x_1$^,得：

![](方程.png)

该式子左侧为0，右侧可看成是$s_2$的一个方程，可以根据它直接求$s_2$。有了$s_2$,$s_1$也非常容易求出。预测就可以得到两帧下的深度，即确定了空间坐标。

## 3. 代码实现；

~~~c++
void triangulation (
	const vector<KeyPoint>& keypoint_1,
	const vector<KeyPoint>& keypoint_2,
	const std::vector< DMatch >& matches,
	const Mat& R, const Mat& t,
	vector<Point3d>& points
);

void triangulation (
	const vector< KeyPoint >& keypoint_1,
	const vector< KeyPoint >& keypoint_2,
	const std::vector< DMatch >& matches,
	const Mat& R, const Mat& t,
	vector< Point3d >& points )
{
	Mat T1 = (Mat_<double> (3,4) <<
	1,0,0,0,
	0,1,0,0,
	0,0,1,0);
	Mat T2 = (Mat_<double> (3,4) <<
	R.at<double>(0,0), R.at<double>(0,1), R.at<double>(0,2), t.at<double>(0,0),
	R.at<double>(1,0), R.at<double>(1,1), R.at<double>(1,2), t.at<double>(1,0),
	R.at<double>(2,0), R.at<double>(2,1), R.at<double>(2,2), t.at<double>(2,0));

    Mat K = ( Mat_<double> ( 3,3 ) << 520.9, 0, 325.1, 0, 521.0, 249.7, 0, 0, 1 );
    vector<Point2d> pts_1, pts_2;
    for ( DMatch m:matches )
    {
        // 将像素坐标转换至相机坐标
        pts_1.push_back ( pixel2cam( keypoint_1[m.queryIdx].pt, K) );
        pts_2.push_back ( pixel2cam( keypoint_2[m.trainIdx].pt, K) );
    }

    Mat pts_4d;
    cv::triangulatePoints( T1, T2, pts_1, pts_2, pts_4d );
    // 转换成非齐次坐标
	for ( int i=0; i<pts_4d.cols; i++ )
	{
        Mat x = pts_4d.col(i);
        x /= x.at<float>(3,0); // 归一化
        Point3d p (x.at<float>(0,0),x.at<float>(1,0),x.at<float>(2,0));
	points.push_back( p );
	}
}
~~~

同时，在main函数中增加三角测量部分，并验证重投影关系：

~~~C++
int main (int argc, char∗∗ argv)
{
	// .....
	//􀀀􀀀 三角化
	vector<Point3d> points;
	triangulation( keypoints_1, keypoints_2, matches, R, t, points );
	
    //􀀀􀀀 验证三角化点与特征点的重投影关系
	Mat K = ( Mat_<double> ( 3,3 ) << 520.9, 0, 325.1, 0, 521.0, 249.7, 0, 0, 1 );
    for ( int i=0; i<matches.size(); i++ )
    {
        Point2d pt1_cam = pixel2cam( keypoints_1[ matches[i].queryIdx ].pt, K );
        Point2d pt1_cam_3d (points[i].x/points[i].z, points[i].y/points[i].z );

        cout<<"point in the first camera frame: "<<pt1_cam<<endl;
        cout<<"point projected from 3D "<<pt1_cam_3d<<", d="<<points[i].z<<endl;

        // 第2幅图
        Point2f pt2_cam = pixel2cam( keypoints_2[ matches[i].trainIdx ].pt, K );
        Mat pt2_trans = R∗( Mat_<double>(3,1) << points[i].x, points[i].y, points[i].z ) + t;
        pt2_trans /= pt2_trans.at<double>(2,0);
        cout<<"point in the second camera frame: "<<pt2_cam<<endl;
        cout<<"point reprojected from second frame: "<<pt2_trans.t()<<endl;
        cout<<endl;
    }
// ...
}
~~~

我们打印了每个空间点在两个相机坐标系下的投影坐标与像素坐标——相当于P 的投影位置与看到的特征点位置。由于误差的存在，它们会有一些微小的差异。以下是某一特征点的信息：

~~~C++
point in the first camera frame: [0.0844072, 0.0734976]
point projected from 3D [0.0843702, 0.0743606], d=14.9895
point in the second camera frame: [0.0431343, 0.0459876]
point reprojected from second frame: [0.04312769812378599, 0.04515455276163744, 1]
~~~

可以看到，误差的量级大约在小数点后第3 位。可以看到，三角化特征点的距离大约为15。

但由于尺度不确定性，我们并不知道这里的15 究竟是多少米。

## 4. 不确定性因素

1. 由于**噪声**的存在，我们估得的运动R; t 不一定精确使(1)式为零，所以更常见的做法是求最小二乘解而不是零解。
2. 三角测量是由平移得到的，有平移才会有对极几何中的三角形，才谈得上三角测量。因此，**纯旋转**是无法使用三角测量的，因为对极约束将永远满足。在平移存在的情况下，我们还要关心三角测量的不确定性，这会引出一个三角测量的矛盾
3. 当平移很小时，**像素上的不确定性**将导致较大的深度不确定性。即若特征点运动一个像素x，使得视线角变化了一个角度，那么将测量到深度值有d 的变化。从几何关系可以看出，当t 较大时，d 将明显变小，这说明平移较大时，在同样的相机分辨率下，三角化测量将更精确。对该过程的定量分析可以使用正弦定理得到，不过这里先考虑定性分析。

## 5. 如何提高精度

要提高三角化的精度，主要有两种方法：

1. 提高特征点的提取精度，也就是提高图像分辨率——但这会导致图像变大，增加计算成本。
2. 使平移量增大。但是，这会导致图像的外观发生明显的变化，比如箱子原先被挡住的侧面显示出来，又比如反射光发生变化，等等。外观变化会使得特征提取与匹配变得困难。

总而言之，增大平移，会导致匹配失效；而平移太小，则三角化精度不够——这就是三角化的矛盾。