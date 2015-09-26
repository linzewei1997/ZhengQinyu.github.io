---
layout: post
title: "数字字符画"
categories: 
tags: 
date: 2015-09-26 19:51:28
---


数字字符画转换

<!-- more -->


#### 1、将单个数字转换成字符画

{% highlight java %}
#include<iostream>
using namespace std;

const bool NUM[10][7] = {
	{ 1, 1, 1, 0, 1, 1, 1 }, //0
	{ 0, 0, 1, 0, 0, 1, 0 }, //1
	{ 1, 0, 1, 1, 1, 0, 1 }, //2
	{ 1, 0, 1, 1, 0, 1, 1 }, //3
	{ 0, 1, 1, 1, 0, 1, 0 }, //4
	{ 1, 1, 0, 1, 0, 1, 1 }, //5
	{ 1, 1, 0, 1, 1, 1, 1 }, //6
	{ 1, 0, 1, 0, 0, 1, 0 }, //7
	{ 1, 1, 1, 1, 1, 1, 1 }, //8
	{ 1, 1, 1, 1, 0, 1, 1 }, //9
};

//has 0->无 1->有
void showHorizontal(int width,int has)
{
	printf("%c", ' ');
	while (width--)
	{
		if(has)printf("%c", '-');
		else printf("%c", ' ');
	}
	printf("%c\n", ' ');
}

//dirt 1->左, -1->右, 0->左右 
void showVertical(int width, int dirt)
{
	int t1 = width,t2;
	while (t1--)
	{
		t2 = width;
		if (dirt == -1)printf("%c", ' ');
		else printf("%c", '|');
		while (t2--)printf("%c", ' ');
		if (dirt == 1)printf("%c", ' ');
		else printf("%c", '|');
		cout << endl;
	}
}

//显示单个数字
void showNum(int i, int width)
{
	if (i < 0 || i>9)return;
	showHorizontal(width, NUM[i][0]);
	showVertical(width, NUM[i][1] - NUM[i][2]);
	showHorizontal(width, NUM[i][3]);
	showVertical(width, NUM[i][4] - NUM[i][5]);
	showHorizontal(width, NUM[i][6]);
	cout << endl;
}


int main()
{
	int m, n;
	while (true)
	{
		cout << "输入单个数字和宽度:";
		cin >> m >> n;
		showNum(m, n);
	}
	system("pause");
	return 0;
}

{% endhighlight %}

#### 2、输出结果为：

	输入单个数字和宽度:4 5
	
	|     |
	|     |
	|     |
	|     |
	|     |
	 -----
	      |
	      |
	      |
	      |
	      |
	
	
	输入单个数字和宽度:5 4
	 ----
	|
	|
	|
	|
	 ----
	     |
	     |
	     |
	     |
	 ----