---
title: 哈希表与C++
Author: Grobenis
date: 2020-03-26 11:32:17
categories: 学习
tags: [数据结构,C++,哈希表]
---

散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。
给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希(Hash）表，函数f(key)为哈希(Hash) 函数。

本节将介绍哈希表的基本概念，与C++实现方法。

本文介绍哈希表的基本概念、常用散列函数与冲突处理方法，分析影响查找性能的因素，并结合 C++11 的 unordered_map 讲解其构造函数、成员函数与遍历等实际用法。

> **以空间换时间，哈希表巧解查找之困**

<!--More-->

## 基本概念

1. 若关键字为**k**，则其值存放在**f(k)**的存储位置上。由此，不需比较便可直接取得所查记录。称这个对应关系**f**为散列函数，按这个思想建立的表为散列表。

2. 对不同的关键字可能得到同一散列地址，即`k1≠k2`，而`f(k1)=f(k2)`，这种现象称为冲突（英语：Collision）。具有相同函数值的关键字对该散列函数来说称做同义词。综上所述，根据散列函数`f(k)`和处理冲突的方法将一组关键字映射到一个有限的连续的地址集（区间）上，并以关键字在地址集中的“像”作为记录在表中的存储位置，这种表便称为散列表，这一映射过程称为散列造表或散列，所得的存储位置称散列地址。

3. 若对于关键字集合中的任一个关键字，经散列函数映象到地址集合中任何一个地址的概率是相等的，则称此类散列函数为均匀散列函数（Uniform Hash function），这就是使关键字经过散列函数得到一个“随机的地址”，从而减少冲突。

## 常用方法

散列函数能使对一个数据序列的访问过程更加迅速有效，通过散列函数，数据元素将被更快地定位。

实际工作中需视不同的情况采用不同的哈希函数，通常考虑的因素有：

1. 计算哈希函数所需时间

2. 关键字的长度

3. 哈希表的大小

4. 关键字的分布情况

5. 记录的查找频率

### 1. 直接寻址法

取关键字或关键字的某个线性函数值为散列地址。即H(key)=key或H(key) = a·key + b，其中a和b为常数（这种[散列函数](https://baike.baidu.com/item/散列函数)叫做自身函数）。若其中H(key）中已经有值了，就往下一个找，直到H(key）中没有值了，就放进去。

### 2. 数字分析法

分析一组数据，比如一组员工的出生年月日，这时我们发现出生年月日的前几位数字大体相同，这样的话，出现冲突的几率就会很大，但是我们发现年月日的后几位表示月份和具体日期的数字差别很大，如果用后面的数字来构成散列地址，则冲突的几率会明显降低。因此数字分析法就是找出数字的规律，尽可能利用这些数据来构造冲突几率较低的散列地址。

### 3. 平方取中法

当无法确定关键字中哪几位分布较均匀时，可以先求出关键字的平方值，然后按需要取平方值的中间几位作为哈希地址。这是因为：平方后中间几位和关键字中每一位都相关，故不同关键字会以较高的概率产生不同的哈希地址。 [1] 

例：我们把英文字母在字母表中的位置序号作为该英文字母的内部编码。例如K的内部编码为11，E的内部编码为05，Y的内部编码为25，A的内部编码为01, B的内部编码为02。由此组成关键字“KEYA”的内部代码为11052501，同理我们可以得到关键字“KYAB”、“AKEY”、“BKEY”的内部编码。之后对关键字进行平方运算后，取出第7到第9位作为该关键字哈希地址，如下图所示

| 关键字 | 内部编码 | 内部编码的平方值 | H(k)关键字的哈希地址 |
| ------ | -------- | ---------------- | -------------------- |
| KEYA   | 11052501 | 122157778355001  | 778                  |
| KYAB   | 11250102 | 126564795010404  | 795                  |
| AKEY   | 01110525 | 001233265775625  | 265                  |
| BKEY   | 02110525 | 004454315775625  | 315                  |

### 4. 折叠法

将关键字分割成位数相同的几部分，最后一部分位数可以不同，然后取这几部分的叠加和（去除进位）作为散列地址。数位叠加可以有移位叠加和间界叠加两种方法。移位叠加是将分割后的每一部分的最低位对齐，然后相加；间界叠加是从一端向另一端沿分割界来回折叠，然后对齐相加。

### 5. 随机数法

选择一随机函数，取关键字的随机值作为散列地址，即$H(key)=random(key)$其中random为随机函数,通常用于关键字长度不等的场合。

### 6. 除留余数法

取关键字被某个不大于散列表表长m的数p除后所得的余数为散列地址。即$H(key) = key \mod p,p<=m$。不仅可以对关键字直接取模，也可在折叠、平方取中等运算之后取模。对p的选择很重要，一般取素数或m，若p选的不好，容易产生同义词。



## 处理冲突

### 1. 开放寻址法

$H_i=(H(key) + d_i) MOD m,i=1,2，…，k(k<=m-1）$，其中`H(key）`为散列函数，`m`为散列表长，$d_i$为增量序列，可有下列三种取法：
1.1. di=1,2,3，…，m-1，称线性探测再散列；
1.2. di=1^2,-1^2,2^2,-2^2，⑶^2，…，±（k)^2,(k<=m/2）称二次探测再散列；
1.3. di=伪随机数序列，称伪随机探测再散列。

### 2. 再散列法

$H_i=RH_i(key), i=1,2，…，k$ ,$RH_i$均是不同的散列函数，即在同义词产生地址冲突时计算另一个散列函数地址，直到冲突不再发生，这种方法不易产生“聚集”，但增加了计算时间。

### 3. 链地址法（拉链法）

### 4. 建立一个公共溢出区

## 查找性能

​		散列表的查找过程基本上和造表过程相同。一些关键码可通过散列函数转换的地址直接找到，另一些关键码在散列函数得到的地址上产生了冲突，需要按处理冲突的方法进行查找。在介绍的三种处理冲突的方法中，产生冲突后的查找仍然是给定值与关键码进行比较的过程。所以，对散列表查找效率的量度，依然用平均查找长度来衡量。
​		查找过程中，关键码的比较次数，取决于产生冲突的多少，产生的冲突少，查找效率就高，产生的冲突多，查找效率就低。因此，影响产生冲突多少的因素，也就是影响查找效率的因素。影响产生冲突多少有以下三个因素：

1. 散列函数是否均匀；
2. 处理冲突的方法；
3. 散列表的装填因子。
散列表的装填因子定义为：α= 填入表中的元素个数 / 散列表的长度
α是散列表装满程度的标志因子。由于表长是定值，α与“填入表中的元素个数”成正比，所以，α越大，填入表中的元素较多，产生冲突的可能性就越大；α越小，填入表中的元素较少，产生冲突的可能性就越小。
实际上，散列表的平均查找长度是装填因子α的函数，只是不同处理冲突的方法有不同的函数。

## C++

C++中的STL提供了hash_map来实现哈希表功能，但在C++11中，`unordered_map`作为一种关联容器，替代了`hash_map`，`unordered_map`的底层实现是`hash`表，所以被称为无序关联容器。
不管是map还是unordered_map都是一种 key-map(value) 映射的容器，提供非常高的查找效率，下面我们来了解`unordered_map`的用法。

### 预备知识

在讲解`unordered_map`之前，我们先得了解一些预备知识：

#### 元素类型

除常用的语言内置类型以外，`unordered_map`的元素类型大致有以下几种：

- value_type : unordered_map元素类型，这种类型的形式为 key-map类型，key和map的类型都是模板类型。
- key_type : key，模板类型
- mapped_type ：map，即我们常说的value，模板类型
- pair类型 ：pair类型也是STL中的常用类型，原型为template <class T1, class T2> struct pair;由于unordered_map使用的就是Key-Map匹配对，所以在这里使用比较多。

#### 概念

- 插槽：英文为bucket，又可以翻译成桶。在hash表中，hash函数通常返回一个整型(或无符号整型)元素，对应hash表的数组下标，但是数组类型通常为指针指向一片内存或者是一个链表头，对应许多元素，就像一个桶可以装很多元素，这里称为插槽。

### 构造函数

```c++
explicit unordered_map ( size_type n = N,const hasher& hf = hasher(),const key_equal& eql = key_equal(),const allocator_type& alloc = allocator_type() );  
```

这个构造函数接受无参数构造

- n：为hash表的最小插槽数，如果未指定，将会被自动确定(取决于特定的库实现，并不固定)
- hf: hash函数，因为底层实现是hash表，必然就有hash函数，STL提供了非常全面的不同类型的hash函数实现，也可以自己实现hash函数。
- key_equal:判断两个key对象的hash值相等以确定查找的命中，STL提供了大部分的不同类型的key_equal实现，同样也可以实现hash函数
- alloc：容易使用的内存构造器，可选择不同的内存构建方式

```
explicit unordered_map ( const allocator_type& alloc );
```

指定unordered_map的构造器

```
template <class InputIterator>
unordered_map ( InputIterator first, InputIterator last,size_type n = N,const hasher& hf = hasher(),const key_equal& eql = key_equal(),const allocator_type& alloc = allocator_type() );  
```

接收输入迭代器构造方式，将迭代器指向的元素区间进行复制构造

```
unordered_map ( const unordered_map& ump );
unordered_map ( const unordered_map& ump, const allocator_type& alloc );  
```

复制构造，第二个可指定构造器

```
unordered_map ( unordered_map&& ump );
unordered_map ( unordered_map&& ump, const allocator_type& alloc );  
```

移动构造方式，这个C++11中新支持的特性，移动构造方式提供临时变量的引用，即右值引用的功能,&表示左值引用，&&表示右值引用。

------

```
unordered_map ( initializer_list<value_type> il,size_type n = N,const hasher& hf = hasher(),const key_equal& eql = key_equal(),const allocator_type& alloc = allocator_type() );  
```

以传入列表的形式构造

示例：

```c++
std::unordered_map[std::string,std::string](std::string,std::string) strmap( {{"name","downey"},{"age","500"}} );
```

### 成员函数

#### 迭代器

##### at()

```c++
mapped_type& at ( const key_type& k );
const mapped_type& at ( const key_type& k ) const;  
```

根据Key值查找容器内元素，并返回map元素的引用。

示例：

```C++
std::unordered_map<std::string,int> mymap={"key",111};
map.at("key")=123;
map.at("key")+=123;
```

##### begin()

```c++
iterator begin() noexcept;
const_iterator begin() const noexcept;
local_iterator begin ( size_type n );
const_local_iterator begin ( size_type n ) const;  
```

指向容器内第一个元素的迭代器。迭代器访问元素时，it->first对应key，it->second对应map(value).

##### end()

```c++
iterator end() noexcept;
const_iterator end() const noexcept;
local_iterator end (size_type n);
const_local_iterator end (size_type n) const;  
```

指向容器内最后一个元素的后一个位置的迭代器。

##### cbegin()

```
const_iterator cbegin() const noexcept;
const_local_iterator cbegin ( size_type n ) const;  
```

返回const类型的第一位置迭代器

##### cend()

返回const类型的最后一个位置的下一位置的迭代器。

#### 清空：clear()

```
void clear() noexcept;
```

删除容器内所有元素。

#### 计数：count()

```
size_type count ( const key_type& k ) const;  
```

某个key值对应的map(value)值的数量，因为unordered_map不允许重复元素，所以返回值总是0或1

#### emplace()

```
template <class... Args>
pair<iterator, bool> emplace ( Args&&... args );  
```

如果key元素是唯一的，在unordered_map中插入新元素，使用Args作为元素构造函数的参数来构造这个新元素。参数为右值引用。
示例：

~~~
mymap.emplace ("NCC-1701", "J.T. Kirk");
~~~

即可插入相应的map元素

#### emplace_hint()

```
template <class... Args>
iterator emplace_hint ( const_iterator position, Args&&... args );  
```

与emplace()操作一致，position参数则是提供一个建议搜索位置的起点的提示，可以优化执行时间。

#### 判断是否为空：empty()

```
bool empty() const noexcept;  
```

判断容器是否为空，返回bool值

#### 擦除：erase()

```
iterator erase ( const_iterator position );
size_type erase ( const key_type& k );
iterator erase ( const_iterator first, const_iterator last );  
```

根据不同的索引擦除插槽中的元素.

#### 查找：find()

```
iterator find ( const key_type& k );
const_iterator find ( const key_type& k ) const;  
```

查找函数，通过key查找一个元素，返回迭代器类型。

#### 查找：bucket()

```c++
size_type bucket ( const key_type& k ) const;  
```

以key值寻找元素在容器中的位置。

示例：

```c++
str_map map1;
map1.insert({"downey","hello"});   
cout<<map1.bucket (it->first)<<endl;
output:
2  
```

从返回值可以看出，即使是插入的第一个元素，位置也不一定是1，这跟容器的hash实现相关。

#### 插入：insert()

```c++
pair<iterator,bool> insert ( const value_type& val );  
```

直接插入元素类型，返回pair类型，返回值pair第一元素是插入元素迭代器，第二元素表示操作是否成功

```c++
template <class P>
pair<iterator,bool> insert ( P&& val );  
```

移动插入方式，可以传入右值插入

~~~c++
iterator insert ( const_iterator hint, const value_type& val );
~~~

用户给出一个插入起点以优化查找时间

~~~c++
template
iterator insert ( const_iterator hint, P&& val );
template
void insert ( InputIterator first, InputIterator last );
~~~

复制型插入，将(first,last]所包含的内容全部复制插入

~~~c++
void insert ( initializer_list<value_type> il );
~~~

插入一个列表形式的元素

#### 比较：key_eq()

```c++
key_equal key_eq() const;  
```

返回比较关键相等性的函数。获取key equal函数，key_equal函数为判断key值是否匹配，在一般情况下，hash函数并不能保证每一个输入对应一个独一无二的输出，可能多个输入会对应同一个输出，这就是hash冲突。可能一个槽内同时由多个元素，这时候就需要使用key_equal来进行进一步判断。

#### 运算符重载

##### '=' 运算符重载

```c++
unordered_map& operator= ( const unordered_map& ump );
unordered_map& operator= ( unordered_map&& ump );
unordered_map& operator= ( intitializer_list<value_type> il );  
```

以不同方式对容器进行赋值。

##### '[]' 操作符重载

```
mapped_type& operator[] ( const key_type& k );
mapped_type& operator[] ( key_type&& k );
```

[]操作符重载，使得容易可以通过map[Key]的方式进行索引。

#### 重建：rehash()

```
void rehash( size_type n );  
```

重建hash表，将插槽的数量扩展的n，如果n小于目前插槽数量，这个函数并不起作用。

#### 翻转：reserve()

```
void reserve ( size_type n );
```

将容器的插槽数设置成最适合n个元素的情况，这样可以避免多次rehash和直接rehash空间的浪费。

与rehash相比，这个函数由用户给一个插槽数量建议值，由系统去分配空间，而rehash则是指定容器的插槽值

#### 大小：size()

```
size_type size() const noexcept;  
```

返回当前容器中元素的个数

#### 交换：swap()

```
void swap ( unordered_map& ump )  
```

交换两个容器的内容，两个容器的类型必须一致，但大小可以不同。

#### 内部信息获取

##### get_allocator()

```
allocator_type get_allocator() const noexcept;  
```

返回容器目前使用的内存构造器。

##### hash_function()

```
hasher hash_function() const;  
```

获取hash容器当前使用的hash函数

##### bucket_count()

```c++
size_type bucket_count() const noexcept;  
```

返回hash表的插槽值个数，这个函数的值对应构造函数中的n(最小插槽数)参数。

##### max_bucket_count()

```
size_type max_bucket_count() const noexcept;  
```

返回容器所能支持的最大插槽数，根据平台不同而不同，一般是一个非常大的数字。

##### bucket_size()

```
size_type bucket_size ( size_type n ) const;  
```

这个函数返回每个插槽中的元素数量。

##### max_load_factor()

```
float max_load_factor() const noexcept;
void max_load_factor ( float z );  
```

第一个函数是查询目前容器最大的负载因子，默认为1。

第二个函数是进行最大的负载因子的设置。

##### max_size()

```
size_type max_size() const noexcept;  
```

容器可支持的元素最大数量，linux平台下，使用4.8.5的STL库中这个值是：268435455

##### load_factor()

```
float load_factor() const noexcept;  
```

load factor在中文中被翻译成负载因子，负载因子是容器中元素数量与插槽数量之间的比例。即：

```
load_factor = size / bucket_count 
```

#### 遍历

##### 使用迭代器遍历

~~~c++
unordered_map<int,int> map;
for(auto n:deck)
{
    map[n]++;
}
int res=map[deck[0]];
unordered_map<int, int>::iterator  iter;
for(iter = map.begin(); iter != map.end(); iter++)
{
    res = gcd(res,iter->second);
}
return res>=2;
~~~

**注意**

* [unordered_map.at](http://unordered_map.at)()和unordered_map[]都用于引用给定位置上存在的元素， 唯一区别在于当key不存在时，at()会抛出了超出范围的异常，而operator []会用默认值进行初始化，因此在落地中经常使用at。
