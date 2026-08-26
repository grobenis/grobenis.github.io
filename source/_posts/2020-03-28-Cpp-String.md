---
title: C++ 字符串
description: "string是C++标准库的一个重要的部分，主要用于字符串处理。可以使用输入输出流方式直接进行string操作，也可以通过文件等手段进行string操作。同时，C++的算法库对string类也有着很好…"
Author: Grobenis
date: 2020-03-28 17:06:29
categories: 学习
tags: [C++, 字符串]
---

string是C++标准库的一个重要的部分，主要用于字符串处理。可以使用输入输出流方式直接进行string操作，也可以通过文件等手段进行string操作。同时，C++的算法库对string类也有着很好的支持，并且string类还和c语言的字符串之间有着良好的接口。

本文将介绍字符串的基本概念和C++的常用操作。

本文介绍 C++ 字符串的基本概念与常用操作，涵盖下标、迭代器、新式 for 循环三种遍历方式，以及 length、find、insert、append、erase、substr、sort、replace、to_string 等成员函数的用法，并补充了字符串输入输出与 C 风格字符串函数的对比。

> **字符串虽小，操作技巧见真章**

<!--More-->

## 字符串

### 基本概念

字符串或串(String)是由数字、字母、下划线组成的一串字符。一般记为 `s=“a1a2···an”(n>=0)`。它是编程语言中表示文本的数据类型。在程序设计中，字符串（string）为符号或数值的一个连续序列，如符号串（一串字符）或二进制数字串（一串二进制数字）。

通常以串的整体作为操作对象，如：在串中查找某个子串、求取一个子串、在串的某个位置上插入一个子串以及删除一个子串等。两个字符串相等的充要条件是：长度相等，并且各个对应位置上的字符都相等。设p、q是两个串，求q在p中首次出现的位置的运算叫做模式匹配。

串的两种最基本的存储方式是顺序存储方式和链接存储方式。

## C++

### 遍历

#### 1. 常规方式 

下标+operator[]

#### 2. 使用迭代器遍历

~~~c++
string::iterator it = str.begin();//返回第一个位置的迭代器（类似于指针）
while (it != str.end()) //str.end()是最后一个数据的下一个位置 
{   
    cout<<*it<<endl;   
    it++; 
}
~~~

#### 3. 新式for循环

~~~c++
for(auto ch:s)  cout<<ch;
~~~



### **成员函数**

#### 长度

~~~c++
int len = str.length();
~~~

#### **查找**

find() 方法检测字符串中是否包含子字符串 str ，如果指定 beg（开始） 和 end（结束） 范围，则检查是否包含在指定范围内，如果指定范围内如果包含指定索引值，返回的是索引值在字符串中的起始位置。如果不包含索引值，返回-1。

#### 插入

对string字符串进行插入和删除字符操作函数原型：

~~~c++
string& insert(int pos, const char* s); //插入字符串
string& insert(int pos, const string& str); //插入字符串
string& insert(int pos, int n, char c); //在指定位置插入n个字符
~~~

#### 添加字符

~~~C++
str.append(1,ch); //在末尾添加一个字符ch
~~~

#### 删除

~~~
cstring& erase(int pos, int n = npos); //删除从Pos开始的n个字符
~~~

#### 字符串拼接

实现在字符串末尾拼接字符串；重载很多

~~~c++
string& operator+=(const char* str); //重载+=操作符
string& operator+=(const char c); //重载+=操作符s
tring& operator+=(const string& str); //重载+=操作符
string& append(const char *s); //把字符串s连接到当前字符串结尾
string& append(const char *s, int n); //把字符串s的前n个字符连接到当前字符串结尾
string& append(const string &s); //同operator+=(const string& str)
string& append(const string &s, int pos, int n);//字符串s中从pos开始的n个字符连接到字符串结尾
~~~

**注意**：例如在 C++ 中，res += s 和 res = res + s 的含义是不一样的。前者是直接在 res 后面添加字符串；后者是用一个临时对象计算 res + s，会消耗很多时间和内存。

#### 提取子串

函数substr可以提取string字符串中的子字符串，该函数有两个参数，第一个参数为需要提取的子字符串的起始下标，第二个参数是需要提取的子字符串的长度。 

~~~c++
 string s1 = "first second third";  
 string s2;  s2 = s1.substr(6, 6);
~~~

#### 排序

~~~c++
sort(str.begin(),src.end());
~~~

#### 替换字符串

~~~c++
replace() 
~~~

#### 整型转串

使用to_string()函数

~~~c++
int num =0;
string s = to_string(num);
~~~

#### 其它操作

| 序号 | 函数 & 目的                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **strcpy(s1, s2);** 复制字符串 s2 到字符串 s1。              |
| 2    | **strcat(s1, s2);** 连接字符串 s2 到字符串 s1 的末尾。       |
| 3    | **strlen(s1);** 返回字符串 s1 的长度。                       |
| 4    | **strcmp(s1, s2);** 如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回值小于 0；如果 s1>s2 则返回值大于 0。 |
| 5    | **strchr(s1, ch);** 返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。 |
| 6    | **strstr(s1, s2);** 返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。 |



### 输入与输出

读写string对象

```C++
string s1, s2;
cin>>s1>>s2;
```

读取一整行

```C++
string line;
while(getline(ci,nline))
    cout<<line<<endl;
```

