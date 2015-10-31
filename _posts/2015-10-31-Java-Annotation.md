---
layout: post
title: "Java注解的使用"
categories: 编程学习
tags: [java,注解]
date: 2015-10-31 12:51:11
---

Annotation(注解)是JDK1.5及以后版本引入的。它可以用于创建文档，跟踪代码中的依赖性，甚至执行基本编译时检查。注解是以‘@注解名’在代码中存在的，根据注解参数的个数，我们可以将注解分为：标记注解、单值注解、完整注解三类。它们都不会直接影响到程序的语义，只是作为注解（标识）存在，我们可以通过反射机制编程实现对这些元数据（用来描述数据的数据）的访问。另外，你可以在编译时选择代码里的注解是否只存在于源代码级，或者它也能在class文件、或者运行时中出现（SOURCE/CLASS/RUNTIME）。见[百度百科](http://baike.baidu.com/link?url=41sFWvcGQrACRFXOXHVbGvo9FYcGopKASa_9lAbuOkiMlbUtmJ9nVFLSbCb8JFfRm8i7m7Rxw3E9rTK1vxutGK)


要熟悉一个知识点，还是自己实际操作一次吧。现在来实现类似Java单元测试的注解吧

<!-- more -->

### 1 自定义注解

单元测试一般需要三个注解，现分别将他们命名为
	
	* 1 @BeforeMethod
	* 2 @TestMethod
	* 3 @AfterMethod

如下：

#### BeforeMethod

{% highlight java %}
package com.sample.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//下面两个注解是Java自带的注解，可以称为注解的注解，用于编程时自定义注解
@Target(ElementType.METHOD)			//该注解只作用用于方法
@Retention(RetentionPolicy.RUNTIME) //该注解在运行时可以被找到
public @interface BeforeMethod {}

{% endhighlight %}

#### TestMethod

{% highlight java %}
package com.sample.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TestMethod {}


{% endhighlight %}

#### AfterMethod

{% highlight java %}
package com.sample.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AfterMethod {}

{% endhighlight %}

### 2 实现单元测试的功能

运行时先获得拥有注解的方法，再利用反射机制来运行这些方法

{% highlight java %}
package com.sample.annotation;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class RunTestAction {
	
	private Class clazz;
	
	List<Method> methodBefores = new ArrayList<Method>();
	List<Method> methodTests = new ArrayList<Method>();
	List<Method> methodAfters = new ArrayList<Method>();
	
	public RunTestAction(String className){
		try {
			clazz = Class.forName(className);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		Method[] methods = clazz.getDeclaredMethods();
		//判断注解类型并将其分类
		for(Method method:methods){
			if(method.isAnnotationPresent(BeforeMethod.class)){
				methodBefores.add(method);
			}else if(method.isAnnotationPresent(AfterMethod.class)){
				methodAfters.add(method);
			}else if(method.isAnnotationPresent(TestMethod.class)){
				methodTests.add(method);
			}
		}
	}
	
	public void runTest() {
		try {
			Object obj = clazz.newInstance();
			Method method = null;
			// 执行各个方法
			for (int j = 0; j < methodTests.size(); ++j){
				method = methodTests.get(j);
				System.out.print(obj.getClass() + "." + method.getName());
				for (int i = 0; i < methodBefores.size(); ++i)methodBefores.get(i).invoke(obj);
				method.invoke(obj);
				for (int i = 0; i < methodAfters.size(); ++i)methodAfters.get(i).invoke(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//用于测试的判断
	public static boolean equalsInt(int a,int b){
		return a == b;
	}
}
{% endhighlight %}

### 3 应用

现在就来使用自定义的注解吧

#### 先定义一个计算类

{% highlight java %}
package com.sample.mathTool;

public class Calculator {
	public int add(int numFirst,int numSecond){
		return numFirst + numSecond; 
	}
	
	public int sub(int numFirst,int numSecond){
		return numFirst + numSecond; 
	}
	
	public int mul(int numFirst,int numSecond){
		return numFirst + numSecond; 
	}
	
	public int div(int numFirst,int numSecond){
		return numFirst + numSecond; 
	}

}
{% endhighlight %}

#### 再定义测试类，注解开始在这里使用了

{% highlight java %}
package com.sample.mathTool;

import com.sample.annotation.AfterMethod;
import com.sample.annotation.BeforeMethod;
import com.sample.annotation.RunTestAction;
import com.sample.annotation.TestMethod;

public class CalclutorTest {
	
	private Integer numFirst;
	private Integer numSecond;
	private boolean success;
	
	@BeforeMethod
	public void assignment(){
		numFirst = 9;
		numSecond = 3;
	}
	
	@AfterMethod
	public void showResult(){
		System.out.println("测试结果:"+success);
	}
	
	@TestMethod
	public void add(){
		success = RunTestAction.equalsInt(numFirst + numSecond,12);
	}
	
	@TestMethod
	public void add2(){
		success = RunTestAction.equalsInt(numFirst + numSecond,13);
	}
	
	@TestMethod
	public void sub(){
		success = RunTestAction.equalsInt(numFirst - numSecond,6);
	}
	
	@TestMethod
	public void mul(){
		success = RunTestAction.equalsInt(numFirst * numSecond,27); 
	}
	
	@TestMethod
	public void div(){
		success = RunTestAction.equalsInt(numFirst / numSecond,3); 
	}

}
{% endhighlight %}


#### 运行测试

{% highlight java %}
package com.sample.annotation;

public class BeginTest {
	public static void main(String[] args){
		RunTestAction action = new RunTestAction("com.sample.mathTool.CalculatorTest");
		//开始测试
		action.runTest();
	}
}
{% endhighlight %}


运行结果如下:

	class com.sample.mathTool.CalculatorTest.add测试结果:true
	class com.sample.mathTool.CalculatorTest.sub测试结果:true
	class com.sample.mathTool.CalculatorTest.mul测试结果:true
	class com.sample.mathTool.CalculatorTest.div测试结果:true
	class com.sample.mathTool.CalculatorTest.add2测试结果:false

End..................




