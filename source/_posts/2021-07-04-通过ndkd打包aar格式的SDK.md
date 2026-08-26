---
title: 通过 NDK 打包 aar 格式的 SDK
description: "根据项目的需求，我们用纯c实现的模块，需要移植到android设备中，制作java版本的sdk，我们需要用到jni和ndk。"
Author: Grobenis
reward: true
copyright: true
date: 2021-07-04 13:06:09
categories: [学习]
tags: [安卓]
---

根据项目的需求，我们用纯c实现的模块，需要移植到android设备中，制作java版本的sdk，我们需要用到jni和ndk。

本文将学习制作SDK的流程。

本文完整演示如何用 NDK/JNI 将纯 C 模块打包成 aar 格式的 Android SDK：从认识 AAR 与 NDK 入手，依次经历创建 Library 模块、javah 生成 JNI 头文件、实现 C 接口函数、配置 Android.mk 与 build.gradle、ndk-build 编译 so 并打包 aar，最后将 aar 导入工程中通过 gradle 依赖使用。

> **写好 JNI 接口，C 库即可服务安卓世界**

<!--More-->

## 目标

根据项目的需求，我们用纯c实现的模块，需要移植到android设备中，制作java版本的sdk，我们需要用到jni和ndk。

`mylib.h`

```
//
// Created by 郭犇 on 2021/4/1.
//

#ifndef MYDEMO_MY_LIB_H
#define MYDEMO_MY_LIB_H

#include <stdlib.h>

char* count_mean(float *a ,int num);
#endif //MYDEMO_MY_LIB_H

```

`mylib.c`

```
//
// Created by 郭犇 on 2021/4/1.
//

char* count_mean(float *a ,int num){
    float sum = 0.0f;
    for(int i = 0;i<=num;i++){
        sum += a[i];
    }
    float mean = sum/num;

    int n = 5; // 显示小数点后5位
    int p,c;
    //char *str=fcvt(mean,n,&p,&c);
    char *str;
    sprintf(str,"%5.2f",mean);
    return str;
}
```

下面用实例一步一步介绍这个过程。

## 一 认识AAR

Android 库的结构与 Android 应用模块的结构相同。它可以提供构建应用所需的一切内容，包括源代码、资源文件和 Android 清单。不过，Android 库将编译为您可以用作 Android 应用模块依赖项的 Android ARchive (AAR) 文件，而不是编译为在设备上运行的 APK。

与 JAR 文件不同，AAR 文件会为 Android 应用提供以下功能：

- AAR 文件可以包含多项 Android 资源和一个清单文件，让您除了能够在 Java 类和方法中进行捆绑以外，还能够在布局和可绘制对象等共享资源中进行捆绑。
- AAR 文件可以[包含 C/C++ 库](https://developer.android.com/studio/build/native-dependencies?hl=zh-cn)，供应用模块的 C/C++ 代码使用。

\*.aar，AAR（Android Archive）包是一个Android库项目的二进制归档文件。我们随便找一个aar文件，然后修改后缀名为‘zip’或者‘rar’格式，然后解压该文件，打开解压后的文件夹，截图如下所示：（每个aar解压后的内容可能不完全一样，但是都会包含AndroidManifest.xml，classes.jar，res，R.txt）。

![](image-20210330150317969.png)

\*.aar文件中包含所有资源，class以及res资源文件。

## 二 NDK

### 简介

本部分简要介绍了 NDK 的工作原理。Android NDK 是一组使您能将 C 或 C++（“原生代码”）嵌入到 Android 应用中的工具。能够在 Android 应用中使用原生代码对于想执行以下一项或多项操作的开发者特别有用：

- 在平台之间移植其应用。
- 重复使用现有库，或者提供其自己的库供重复使用。
- 在某些情况下提高性能，特别是像游戏这种计算密集型应用。

**Application.mk**文件

不一定要有，可以用来配置编译平台相关内容，常用的估计只是APP_ABI字段，它用来指定我们需要基于哪些CPU架构的.so文件，当然你可以配置多个平台（如果ndk-build 没有指定 Application.mk，则默认编译出所有平台的.so文件）：

> APP_ABI := armeabi armeabi-v7a x86 mips

这个文件还可以配置Android.mk文件

> APP_BUILD_SCRIPT := Android.mk

## 三 利用Android Studio生成aar文件

生成`.aar`形式SDK的整个过程我们可以利用AS实现。

### 3.1 建立一个项目ProjectDemo

#### 1 新建项目

![](image-20210401170348808.png)

#### 2 配置项目

<!-- <img src="image-20210401170459101.png" alt="image-20210401170459101" style="zoom: 67%;" /> 图片源文件已丢失 -->

点finish结束即可。

### 3.2 建立一个library的模块库MySDK

#### 1 新建模块

![](image-20210401170658032.png)

#### 2 选择Library的模块

![](image-20210401170716786.png)

#### 3 配置该模块

![](image-20210401171021523.png)

现在建议从Android视图切换到Project视图，这样有利于我看看清楚整个项目的目录结构

![](image-20210401171346953.png)

### 3.3 建立MySDK类,编写Native方法，生成jni头文件

#### 1 建立类

接下来，我们建立一个名为MySDK的java类，作为SDK的接口。

![](image-20210401171535574.png)

生成的函数类如下：

![](image-20210401171822235.png)

#### 2 书写方法名

接下来，我们可以需要写类中的方法，目前只需要写函数名即可。我定义了一个用于计算链表平均值的函数，输入为一个

![](image-20210401172213525.png)

（为了展示后边Jni的书写方法，我用了一个链表的数据结构。）目前定义的这个类不需要实现他的方法，仅仅用于生成JNI的头文件。（由于JNI的头文件书写极其复杂，因此我们使用自动的方法生成）。

#### 3 利用javah生成头文件

利用javah生成头文件的操作， 我们可以使用AS自带的命令行完成。

![](image-20210401172646427.png)

在terminal中，输入以下的命令：

![](image-20210401172733132.png)

我们可以在目录中看到文件`com_xiaomi_phonesleepsdk_PhoneSleepSDK.h`：

![](image-20210401172919207.png)

内容长这样：

![](image-20210401173031982.png)

### 3.4 建立JNI文件夹，建立main.c，实现函数，编写编译文件Android.mk

#### 1 建立JNI文件夹

![](image-20210401173247121.png)

#### 2 建立main.c文件

main.c文件将实现前文中文件中的方法。作为JAVA转C的接口。

![](image-20210401173328777.png)

![](image-20210401173501401.png)

#### 3 实现接口函数

在实现函数之前，我们需要把生成的头文件，移动或者复制到jni文件夹

![](image-20210401173600997.png)

然后可以把自己的C库复制到jni目录下边。

![](image-20210401193013539.png)

接下来，我们需要利用JNI实现main.c中的接口函数。

main.c内容如下：

```C
//
// Created by 郭犇 on 2021/4/1.
//

#include <stdlib.h>
#include "com_xiaomi_mysdk_MySDK.h"
#include "my_lib.h"

static jstring stoJstring(JNIEnv* env, char* pat);

JNIEXPORT jstring JNICALL Java_com_xiaomi_mysdk_MySDK_my_1count_1mean_1funtion
   (JNIEnv *env, jobject thisz , jobject a, jint b){
        int num = b; //JNI语法中，int与jint支持强制转换
        //链表的类型转换比较复杂

        jclass list_class = (*env)->FindClass(env,"java/util/ArrayList");
        jmethodID list_get =  (*env)->GetMethodID(env, list_class, "get", "(I)Ljava/lang/Object;");
        jmethodID list_size = (*env)->GetMethodID(env, list_class, "size", "()I");

        jclass float_class = (*env)->FindClass(env,"java/lang/Float");
        jmethodID get_float_value = (*env)->GetMethodID(env, float_class, "floatValue","()F");

        float *l = (float *)malloc(num*(sizeof(float)));
        for (int i=0; i < num; i++) {
            jobject obj_element = (*env)->CallObjectMethod(env, a, list_get, i);
            float float_ele = (*env)->CallFloatMethod(env, obj_element, get_float_value);
            l[i] = float_ele;
        }
        char* str = count_mean(l ,num);
        jstring ret = stoJstring(env, str);
        return ret;
   }

static jstring stoJstring(JNIEnv* env, char* pat){
    jclass strClass = (*env)->FindClass(env, "java/lang/String");
    jmethodID ctorID = (*env)->GetMethodID(env, strClass, "<init>", "([BLjava/lang/String;)V");
    jbyteArray bytes = (*env)->NewByteArray(env, strlen(pat));
    (*env)->SetByteArrayRegion(env, bytes, 0, strlen(pat), (jbyte*)pat);
    jstring encoding = (*env)->NewStringUTF(env, "utf-8");
    return (jstring)(*env)->NewObject(env, strClass, ctorID, bytes, encoding);
}
```

#### 4 配置 Android.mk

该文件内容如下：

```
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := MySDK
LOCAL_SRC_FILES := main.c
LOCAL_SRC_FILES += my_lib.c

include $(BUILD_SHARED_LIBRARY)
```

其中，LOCAL_MODULE := mysdklibrary，这里的定义，最终生成的so文件是 libMySDK.so。

此外可以加上以下语句，用于生成最终的log。

```
LOCAL_LDLIBS :=-llog
```

#### 5 配置 MySDK下的build.gradle

修改图下的位置

![](image-20210402191344975.png)

其中，moduleName对应的是 SDK的名字。cFlags表示C语言对应的标准。

sourceSets设置中。jni.srcDirs指的是我们放置C语言源代码的目录。

jniLibs.srcDirs指的是生成的so库所在的位置。（注：这条语句不是用来指示生成的位置，只是为后续打包aar时找到so库用的）。

到这里，jni部分的工作基本完成了。

#### 6 调用ndk-build生成so库。

![](image-20210401193741347.png)

生成的so库在如下的位置

![](image-20210402191907379.png)

### 3.5 把源代码和so库一并打包到aar文件中

我们可以直接利用AS自带的右方的gradle按钮。按照如图的目录找到assembleRelease

![](image-20210402192057568.png)

运行结束之后，我们就可以在MyDemo/MySDK/build/outputs/aar/目录中找到MySDK-release.aar文件。

![](image-20210402192217160.png)

双击aar文件可以看到如下所示的目录；

![](image-20210402192323837.png)

可以发现包含了各种文件。jni文件夹下是四个so库。可供Java程序调用的so库就在jni目录中。

![](image-20210402192431250.png)

至此，**打包成功！**。

## 四 将.aar导入项目中进行使用

下面主要看看在Android Studio中如何加载本地的\*.aar文件。

1. 把aar文件放在一个文件目录内，比如就放在libs目录内；

   ![](image-20210402193110508.png)

2. 在app的build.gradle文件添加如下内容；

   ```java
   repositories {
       flatDir {
           dirs 'libs'
       }
   }
   ```

3. 之后只需要添加一句gradle依赖便方便的引用了该aar文件；

   ```gradle
   dependencies {
       implementation 'androidx.appcompat:appcompat:1.2.0'
       implementation 'com.google.android.material:material:1.3.0'
       implementation 'androidx.constraintlayout:constraintlayout:2.0.4'

   	//添加以下这句
       implementation fileTree(dir: 'libs', include: ['*.aar'])

       testImplementation 'junit:junit:4.+'
       androidTestImplementation 'androidx.test.ext:junit:1.1.2'
       androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
   }
   ```

   至此，在Android Studio中加载本地的\*.aar文件就结束。

4. 修改主活动

   ```java
   public class MainActivity extends AppCompatActivity {
       private static final String TAG = "AppCompatActivity";

       @Override
       protected void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_main);
           Log.d(TAG, "1");
           List<Float> a = new ArrayList<>();
           a.add(1.0f);
           a.add(2.0f);
           a.add(3.0f);
           int b = 3;
           float ret = MySDK.my_count_mean_funtion(a,b);
           Log.d("ret", Float.toString(ret));
       }
   }
   ```

5. 运行程序得到正确结果

   ![](image-20210419201234352.png)

## 注意事项

1. jni接口文件的编写是能否成功的关键，考验编程能力
2. 为了便于调试，建议先在将主程序与module连接起来调试通，最后再生成aar形式的SDK；
