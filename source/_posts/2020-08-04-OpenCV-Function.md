---
title: OpenCV 图像像素遍历方法
description: "本文总结 OpenCV 遍历图像像素的四种方式：at 模板函数、指针、迭代器与基于 isContinuous 的高效一维遍历，每种方式均配以 colorReduce 颜色缩减实例代码，便于按性能需求选…"
Author: Grobenis
reward: true
copyright: true
date: 2020-08-04 15:17:31
categories: [学习]
tags: [OpenCV, 图像处理]
---

本文总结 OpenCV 遍历图像像素的四种方式：at 模板函数、指针、迭代器与基于 isContinuous 的高效一维遍历，每种方式均配以 colorReduce 颜色缩减实例代码，便于按性能需求选型。

> **选对遍历方式，图像处理事半功倍**

<!--More-->

## 图像操作

### 遍历图像的四种方式

1. `at<typename>(i,j)`

Mat类提供了一个at的方法用于取得图像上的点，它是一个模板函数，可以取到任何类型的图像上的点。下面我们通过一个图像处理中的实际来说明它的用法。

```C++
void colorReduce(Mat& image,int div){
    for(int i=0;i<image.rows;i++){
       for(int j=0;j<image.cols;j++){
           image.at<Vec3b>(i,j)[0]=image.at<Vec3b>(i,j)[0]/div*div+div/2;
            image.at<Vec3b>(i,j)[1]=image.at<Vec3b>(i,j)[1]/div*div+div/2;
           image.at<Vec3b>(i,j)[2]=image.at<Vec3b>(i,j)[2]/div*div+div/2;
       }
    }
}
```

2. 用指针来遍历图像

我们实际喜欢把原图传进函数内，但是在函数内我们对原图像进行了修改，而将原图作为一个结果输出，很多时候我们需要保留原图，这样我们需要一个原图的副本。

```C++
 1 void colorReduce(const Mat& image,Mat& outImage,int div)
 2 {
 3     // 创建与原图像等尺寸的图像
 4     outImage.create(image.size(),image.type());
 5     int nr=image.rows;
 6     // 将3通道转换为1通道
 7     int nl=image.cols*image.channels();
 8     for(int k=0;k<nr;k++){
10         // 每一行图像的指针
11         const uchar* inData=image.ptr<uchar>(k);
12         uchar* outData=outImage.ptr<uchar>(k);
13         for(int i=0;i<nl;i++){
15             outData[i]=inData[i]/div*div+div/2;
16         }
17     }
18 }
```

3. 使用迭代器来遍历图像

```C++
 1 void colorReduce(const Mat& image,Mat& outImage,int div)
 2 {
 3     outImage.create(image.size(),image.type());
 4     MatConstIterator_<Vec3b> it_in=image.begin<Vec3b>();
 5     MatConstIterator_<Vec3b> itend_in=image.end<Vec3b>();
 6     MatIterator_<Vec3b> it_out=outImage.begin<Vec3b>();
 7     MatIterator_<Vec3b> itend_out=outImage.end<Vec3b>();
 8     while(it_in!=itend_in)
 9     {
10         (*it_out)[0]=(*it_in)[0]/div*div+div/2;
11         (*it_out)[1]=(*it_in)[1]/div*div+div/2;
12         (*it_out)[2]=(*it_in)[2]/div*div+div/2;
13         it_in++;
14         it_out++;
15     }
16 }
```

4. 最高效的方法

当不对行进行填补的时候，图像可被视为一个长为W x H的一维数组。用isContinuous来判断是否对行进行的填补。

```C++
int n1 = image.rows;
int nc = image.cols * image.channels（）;
if（image.isContinuous（））//判断是否对行有额外的填补像素，返回值为真，则没有填补。
{
    nc = nc * n1;
    n1 = 1;
}
for（int i = 0; i <n1; i ++）//若图像是连续的，则只循环一次
{
    uchar * data = image.ptr <uchar>（i）;
    for（int j = 0; j <nc; j ++）
    {
        data [j] = 0;
    }
}
```
