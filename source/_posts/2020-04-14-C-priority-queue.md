---
title: C++ 优先队列
Author: Grobenis
date: 2020-04-14 10:15:06
categories: [学习]
tags: [C++,优先队列]
---

普通的队列是一种先进先出的数据结构，元素在队列尾追加，而从队列头删除。在优先队列中，元素被赋予优先级。当访问元素时，具有最高优先级的元素最先删除。优先队列具有最高级先出 （first in, largest out）的行为特征。通常采用堆数据结构来实现。本节来介绍C++中的优先队列。

<!--More-->

优先队列是0个或多个元素的集合,每个元素都有一个优先权或值,对优先队列执行的操作有1) 查找;2) 插入一个新元素;3) 删除.在最小优先队列(min priority queue)中,查找操作用来搜索优先权最小的元素,删除操作用来删除该元素;对于最大优先队列(max priority queue),查找操作用来搜索优先权最大的元素,删除操作用来删除该元素.优先权队列中的元素可以有相同的优先权,查找与删除操作可根据任意优先权进行.

最大优先权队列的[抽象数据类型](https://baike.baidu.com/item/抽象数据类型)描述下所示,最小优先队列的抽象数据类型描述与之类似,只需将最大改为最小即可.

## 一、相关定义

优先队列容器与队列一样，只能从队尾插入元素，从队首删除元素。但是它有一个特性，就是队列中最大的元素总是位于队首，所以出队时，并非按照先进先出的原则进行，而是将当前队列中最大的元素出队。这点类似于给队列里的元素进行了由大到小的顺序排序。元素的比较规则默认按元素值由大到小排序，可以重载“<”操作符来重新定义比较规则。

优先级队列可以用向量(vector)或双向队列(deque)来实现(注意list container不能用来实现queue，因为list的迭代器不是任意存取iterator，而pop中用到堆排序时是要求randomaccess iterator 的!)：

```
priority_queue<vector<int>, less<int> > pq1; 　　　 // 使用递增less<int>函数对象排序
priority_queue<deque<int>, greater<int> > pq2; 　　// 使用递减greater<int>函数对象排序
```


其成员函数有“判空(empty)” 、“尺寸(Size)” 、“栈顶元素(top)” 、“压栈(push)” 、“弹栈(pop)”等。

 

## 二、priority_queue

### 简介

**首先要包含头文件`#include`**, 他和`queue`不同的就在于我们可以自定义其中数据的优先级, 让优先级高的排在队列前面,优先出队。在默认的优先队列中，优先级高的先出队。在默认的int型中先出队的为较大的数。

优先队列具有队列的所有特性，包括队列的基本操作，只是在这基础上添加了内部的一个排序，它本质是一个堆实现的。

### 基本操作

> 和队列基本操作相同:
>
> - top() 	      访问队头元素
> - empty()      队列是否为空
> - size()          返回队列内元素个数
> - push()        插入元素到队尾 (并排序)
> - emplace() 原地构造一个元素并插入队列
> - pop()         弹出队头元素
> - swap()       交换内容

### 头文件：

```
\#include <queue>
```

### 声明方式：

#### 1、普通方法：

```c++
priority_queue<int> q;  　　　　　　　　　　　  //通过操作，按照元素从大到小的顺序出队
//升序队列
priority_queue <int,vector<int>,greater<int> > q; //通过操作，按照元素从小到大的顺序出队
//降序队列
priority_queue <int,vector<int>,less<int> >q;

//greater和less是std实现的两个仿函数（就是使一个类的使用看上去像一个函数。其实现就是类中实现一个operator()，这个类就有了类似函数的行为，就是一个仿函数类了）
```

#### 2、自定义优先级：

```c++
struct cmp {
　　operator bool ()(int x, int y)   
　　{     
　　　　 return　x > y;　　 // x小的优先级高    //也可以写成其他方式，如： return p[x] > p[y];表示p[i]小的优先级高
　　}
};
priority_queue<int, vector<int>, cmp> q;  //定义方法
//其中，第二个参数为容器类型。第三个参数为比较函数。
```

#### 3、结构体声明方式：

```c++
struct node {   
　　int x, y; 
　　friend bool operator < (node a, node b)  
　　{     
　　　　return a.x > b.x;  //结构体中，x小的优先级高   
　　}
};

priority_queue<node>q;  //定义方法
// 在该结构中，y为值, x为优先级。
// 通过自定义operator<操作符来比较元素中的优先级。
// 在重载”<”时，最好不要重载”>”，可能会发生编译错误
```

## 三、例子

### **1、基本类型优先队列的例子：**

```c++
#include<iostream>
#include <queue>
using namespace std;
int main() 
{
    //对于基础类型 默认是大顶堆
    priority_queue<int> a; 
    //等同于 priority_queue<int, vector<int>, less<int> > a;
    
    //      这里一定要有空格，不然成了右移运算符↓↓
    priority_queue<int, vector<int>, greater<int> > c;  //这样就是小顶堆
    priority_queue<string> b;

    for (int i = 0; i < 5; i++) 
    {
        a.push(i);
        c.push(i);
    }
    while (!a.empty()) 
    {
        cout << a.top() << ' ';
        a.pop();
    } 
    cout << endl;

    while (!c.empty()) 
    {
        cout << c.top() << ' ';
        c.pop();
    }
    cout << endl;

    b.push("abc");
    b.push("abcd");
    b.push("cbd");
    while (!b.empty()) 
    {
        cout << b.top() << ' ';
        b.pop();
    } 
    cout << endl;
    return 0;
}
```

运行结果：

```
4 3 2 1 0``0 1 2 3 4``cbd abcd abc``请按任意键继续. . .
```

### **2、用pair做优先队列元素的例子：**

规则：pair的比较，先比较第一个元素，第一个相等比较第二个。

```c++
#include<iostream>
#include <queue>
using namespace std;
int main() 
{
    //对于基础类型 默认是大顶堆
    priority_queue<int> a; 
    //等同于 priority_queue<int, vector<int>, less<int> > a;
    
    //      这里一定要有空格，不然成了右移运算符↓↓
    priority_queue<int, vector<int>, greater<int> > c;  //这样就是小顶堆
    priority_queue<string> b;

    for (int i = 0; i < 5; i++) 
    {
        a.push(i);
        c.push(i);
    }
    while (!a.empty()) 
    {
        cout << a.top() << ' ';
        a.pop();
    } 
    cout << endl;

    while (!c.empty()) 
    {
        cout << c.top() << ' ';
        c.pop();
    }
    cout << endl;

    b.push("abc");
    b.push("abcd");
    b.push("cbd");
    while (!b.empty()) 
    {
        cout << b.top() << ' ';
        b.pop();
    } 
    cout << endl;
    return 0;
}
```

运行结果：

```
2 5``1 3``1 2``请按任意键继续. . .
```

### **3、用自定义类型做优先队列元素的例子**

```c++
#include <iostream>
#include <queue>
using namespace std;

//方法1
struct tmp1 //运算符重载<
{
    int x;
    tmp1(int a) {x = a;}
    bool operator<(const tmp1& a) const
    {
        return x < a.x; //大顶堆
    }
};

//方法2
struct tmp2 //重写仿函数
{
    bool operator() (tmp1 a, tmp1 b) 
    {
        return a.x < b.x; //大顶堆
    }
};

int main() 
{
    tmp1 a(1);
    tmp1 b(2);
    tmp1 c(3);
    priority_queue<tmp1> d;
    d.push(b);
    d.push(c);
    d.push(a);
    while (!d.empty()) 
    {
        cout << d.top().x << '\n';
        d.pop();
    }
    cout << endl;

    priority_queue<tmp1, vector<tmp1>, tmp2> f;
    f.push(b);
    f.push(c);
    f.push(a);
    while (!f.empty()) 
    {
        cout << f.top().x << '\n';
        f.pop();
    }
}
```

运行结果：

```
`3`
`2`
`1` 

`3`
`2`
`1`

请按任意键继续. . .
```

 参考资料

[1] [c++优先队列(priority_queue)用法详解](https://www.cnblogs.com/huashanqingzhu/p/11040390.html)

[2] [C++STL——优先队列](https://www.cnblogs.com/xzxl/p/7266404.html）

