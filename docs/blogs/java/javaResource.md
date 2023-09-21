---
title: Java读取resource目录下的资源文件
date: 2023/8/17
tags:
 - Java
categories:
 - java
---

# Java读取resource目录下的资源文件
> 测试类全限定名`com.reine.FileReadTests`

## 通过class获取资源文件
```java
@Test
void readFromByClass() {
    // 同包
    URL u0 = FileReadTests.class.getResource("test.txt");
    System.out.println(u0.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/com/reine/test.txt
    // 根目录下
    URL u1 = FileReadTests.class.getResource("/test.txt");
    System.out.println(u1.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/test.txt
    // 不同包下，相对路径
    URL u2 = FileReadTests.class.getResource("/com/test/test.txt");
    System.out.println(u2.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/com/test/test.txt
}
```

## 通过classloader获取资源文件（推荐）
```java
@Test
void readFromByClassLoader() {
    URL u0 = FileReadTests.class.getClassLoader().getResource("test.txt");
    System.out.println(u0.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/test.txt
    URL u1 = ClassLoader.getSystemResource("test.txt");
    System.out.println(u1.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/test.txt
    URL u2 = ClassLoader.getSystemClassLoader().getResource("test.txt");
    System.out.println(u2.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/test.txt
    URL u3 = Thread.currentThread().getContextClassLoader().getResource("test.txt");
    System.out.println(u3.toString());// file:/E:/Code/Java/Console/read-file-demo/build/resources/test/test.txt
}
```