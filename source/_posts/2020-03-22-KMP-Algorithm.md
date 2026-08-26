---
title: KMP 字符串匹配算法
description: "KMP算法是一种改进的字符串匹配算法，由D.E.Knuth，J.H.Morris和V.R.Pratt提出的，因此人们称它为克努特—莫里斯—普拉特操作（简称KMP算法）。KMP算法的核心是利用匹配失败后…"
Author: Grobenis
date: 2020-03-22 14:31:40
categories: 学习
tags: [C++, KMP]
---

KMP算法是一种改进的字符串匹配算法，由D.E.Knuth，J.H.Morris和V.R.Pratt提出的，因此人们称它为克努特—莫里斯—普拉特操作（简称KMP算法）。KMP算法的核心是利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。具体实现就是通过一个next()函数实现，函数本身包含了模式串的局部匹配信息。KMP算法的时间复杂度O(m+n)。

本文讲解 KMP 字符串匹配算法的原理与实现，从暴力匹配的回溯缺陷出发，引入 next 数组记录模式串前缀后缀的最长公共长度，将时间复杂度从 O(nm) 优化到 O(m+n)，并给出完整的 next 数组构造与匹配源代码。

> **利用失配信息，让匹配不再回溯**

<!--More-->

## 问题描述

有一个文本串S，和一个模式串P，现在要查找P在S中的位置，怎么查找呢？

## 暴力匹配算法

如果用暴力匹配的思路，并假设现在文本串S匹配到 i 位置，模式串P匹配到 j 位置，则有：

- 如果当前字符匹配成功（即S[i] == P[j]），则i++，j++，继续匹配下一个字符；
- 如果失配（即S[i]! = P[j]），令i = i - (j - 1)，j = 0。相当于每次匹配失败时，i 回溯，j 被置为0。

回溯的方法使得算法复杂度上升。

因此需要优化回溯的步骤以简化算法。

源代码：

```C
/* 字符串下标始于 0 */
int NaiveStringSearch(string S, string P)
{
    int i = 0;    // S 的下标
    int j = 0;    // P 的下标
    int s_len = S.size();
    int p_len = P.size();
    while (i < s_len && j < p_len)
    {
        if (S[i] == P[j])  // 若相等，都前进一步
        {
            i++;
            j++;
        }
        else               // 不相等
        {
            i = i - j + 1;
            j = 0;
        }
    }
    if (j == p_len)        // 匹配成功
        return i - j;
    return -1;
}
```

时间复杂度：$O(nm)$

当n和m很大的时候不好用。

## KMP算法

**引入概念**

- 前缀：指的是字符串的子串中从原串最前面开始的子串
- 后缀：指的是字符串的子串中在原串结尾处结尾的子串

**算法思想**

利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。具体实现就是通过一个next()函数实现，函数本身包含了模式串的局部匹配信息。KMP算法的时间复杂度O(m+n)。

KMP算法引入了一个next数组，next[i]表示的是前i的字符组成的这个子串。

**next数组的意义**

next 数组里面的变量，存的是最有可能匹配的长度，也就是在模式串中，前缀和后缀相等的最大长度。

以"ABCDABD"为例

－"A"的前缀和后缀都为空集，共有元素的长度为0；

－"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；

－"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；

－"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；

－"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；

－"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；

－"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。

next 数组中，第一个值，也就是next [0] = -1，而且，next [n]里面存的是 str[0] ~ str[n - 1]的前缀和后缀相等的最大长度。

**源代码：**

```C
#include <iostream>
#include <string>
using namespace std;

/* P 为模式串，下标从 0 开始 */
void GetNext(string P, int next[])
{
    int p_len = P.size();
    int i = 0;   // P 的下标
    int j = -1;
    next[0] = -1;

    while (i < p_len)
    {
        if (j == -1 || P[i] == P[j])
        {
            i++;
            j++;
            next[i] = j;
        }
        else
            j = next[j];
    }
}

/* 在 S 中找到 P 第一次出现的位置 */
int KMP(string S, string P, int next[])
{
    GetNext(P, next);
    int i = 0;  // S 的下标
    int j = 0;  // P 的下标
    int s_len = S.size();
    int p_len = P.size();
    while (i < s_len && j < p_len) // 因为末尾 '\0' 的存在，所以不会越界
    {
        if (j == -1 || S[i] == P[j])  // P 的第一个字符不匹配或 S[i] == P[j]
        {
            i++;
            j++;
        }
        else
            j = next[j];  // 当前字符匹配失败，进行跳转
    }
    if (j == p_len)  // 匹配成功
        return i - j;

    return -1;
}

int main()
{
    int next[100] = { 0 };
    cout << KMP("bbc abcdab abcdabcdabde", "abcdabd", next) << endl; // 15
    return 0;
}
```

**时间复杂度**：$O(m+n)$
