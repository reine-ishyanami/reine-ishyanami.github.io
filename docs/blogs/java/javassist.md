---
title: 使用Javassist做字节码处理
date: 2023/12/5
tags:
 - Java
categories:
 - java
---

# 使用Javassist做字节码处理

> Javassist是一个强大的字节码操作工具，它提供了在运行时编辑Java字节码的能力。通过Javassist，开发人员可以动态地创建和修改Java类

* 引入依赖

    ```xml
    <dependency>
        <groupId>org.javassist</groupId>
        <artifactId>javassist</artifactId>
        <version>3.29.2-GA</version>
    </dependency>
    ```

## 示例

1. 创建一个基本的类

    ```java
    @Test
    void make_class() throws NotFoundException, IOException, CannotCompileException {
        ClassPool classPool = ClassPool.getDefault(); // 获取管理类的类池，可用于创建，获取某个类
        CtClass ctClass = classPool.makeClass("com.reine.DynamicClass");
        ctClass.writeFile();  // 创建该类
    }
    ```

    生成的类反编译后结构如下

    ```java
    package com.reine;

    public class DynamicClass {
        public DynamicClass() {
        }
    }
    ```

2. 创建方法和字段

    ```java
    @Test
    void mark_class_with_method_and_field() throws CannotCompileException, NotFoundException, IOException {
        ClassPool classPool = ClassPool.getDefault();
        CtClass ctClass = classPool.makeClass("com.reine.DynamicClass");
        CtMethod ctMethod = CtNewMethod.make("""
                public void newMethod(){
                    System.out.println("Thie is a new method");
                }
                """, ctClass);
        ctClass.addMethod(ctMethod);
        CtField ctField = new CtField(CtClass.intType, "intField", ctClass);
        ctClass.addField(ctField);
        ctClass.writeFile();
    }
    ```

    生成的类反编译后结构如下

    ```java
    package com.reine;

    public class DynamicClass {
        int intField;

        public void newMethod() {
            System.out.println("Thie is a new method");
        }

        public DynamicClass() {
        }
    }
    ```

3. 修改已有的类的方法或字段

    ```java
    // 执行此测试方法时，需要将上面第二点的测试方法的注解@Test改为@BeforeEach，并且在该方法末尾添加上ctClass.defrost();
    @Test
    void modify_class_method() throws NotFoundException, CannotCompileException, IOException {
        ClassPool classPool = ClassPool.getDefault();
        CtClass existingClass = classPool.get("com.reine.DynamicClass");
        CtMethod existingMethod = existingClass.getDeclaredMethod("newMethod");
        existingMethod.insertBefore("""
                {System.out.println("new Method Before");}
                """);

        existingMethod.insertAfter("""
                {System.out.println("new Method After");}
                """);

        CtField existingField = existingClass.getDeclaredField("intField");
        existingField.setModifiers(Modifier.PUBLIC);
        existingClass.writeFile();
    }
    ```

    生成的类反编译后结构如下

    ```java
    package com.reine;

    public class DynamicClass {
        public int intField;

        public void newMethod() {
            System.out.println("new Method Before");
            System.out.println("Thie is a new method");
            Object var2 = null;
            System.out.println("new Method After");
        }

        public DynamicClass() {
        }
    }
    ```

4. 继承父类或实现接口

    ```java
    @Test
    void extends_or_implements() throws CannotCompileException, NotFoundException, IOException {
        ClassPool classPool = ClassPool.getDefault();
        CtClass ctClass = classPool.makeClass("com.reine.DynamicClass");
        CtClass superClass = classPool.getCtClass("java.lang.RuntimeException");
        ctClass.setSuperclass(superClass);  // 继承RuntimeException
        CtClass interfaceClass = classPool.getCtClass("java.io.Serializable");
        ctClass.addInterface(interfaceClass);  // 实现Serializable
        ctClass.writeFile();
    }    
    ```

    生成的类反编译后结构如下

    ```java
    package com.reine;

    import java.io.Serializable;

    public class DynamicClass extends RuntimeException implements Serializable {
        public DynamicClass() {
        }

        public DynamicClass(String var1) {
            super(var1);
        }

        public DynamicClass(String var1, Throwable var2) {
            super(var1, var2);
        }

        public DynamicClass(Throwable var1) {
            super(var1);
        }

        protected DynamicClass(String var1, Throwable var2, boolean var3, boolean var4) {
            super(var1, var2, var3, var4);
        }
    }
    ```