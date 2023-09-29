---
title: GraalVM native-image编译
date: 2023/7/22
tags:
 - Java
 - Cmd
categories:
 - java
---

# GraalVM native-image编译

1. 下载[graalvm]()
2. 配置`JAVA_HOME`环境变量，内容为下载的graalvm的解压路径；将二进制文件，即`%JAVA_HOME%\bin`添加到`Path`环境变量中
3. 安装native-image

    ```shell
    gu.cmd install native-image
    # 也可以先下载native-image的jar然后手动安装
    gu.cmd install -L <jar包路径>
    ```

4. 下载[Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/)

    > 选择以下组件
    >  
    > - 英语语言包
    > - MSVC v142 - VS 2019 C++x64/x86生成工具（或者之后的版本）
    > - Windows 10 SDK （10.0.19041.0 或者之后的版本）
    > - MSVC v142 - VS 2019 C++ x64/x86 Spectre缓解库（和上面的生成工具版本一样）

5. 配置环境变量

   -  `Path`中添加vs msvc的bin目录，
   `D:\Program Files\Microsoft Visual Studio\2022\Enterprise\VC\Tools\MSVC\14.35.32215\bin\Hostx64\x64`
   下面将`D:\Program Files\Microsoft Visual Studio\2022\Enterprise`记为`<vs>` 
   -  通过注册表获取windows sdk的安装目录
   注册表路径`计算机\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Microsoft SDKs\Windows\v10.0`
   复制键为`InstallationFolder`的值，下面步骤会用到，记为`<windows10sdk>` 
   -  配置环境变量`INCLUDE`
   `<windows10sdk>\Include\10.0.22000.0\ucrt;<windows10sdk>\Include\10.0.22000.0\um;<windows10sdk>\Include\10.0.22000.0\shared;<vs>\VC\Tools\MSVC\14.35.32215\include;` 
   -  配置环境变量`LIB`
   `D<windows10sdk>\Lib\10.0.22000.0\um\x64;<windows10sdk>\Lib\10.0.22000.0\ucrt\x64;<vs>\VC\Tools\MSVC\14.35.32215\lib\x64;` 

6. 编译测试
    > 新建`HelloWorld.java`文件，内容如下
    
    ```java
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
    ```

    > 编译测试 
    
    ```shell
    javac HelloWorld.java
    native-image ./HelloWorld
    ./HelloWorld # 出现Hello, World!代表环境配置成功
    ```

# GraalVM native-image编译SpringBoot3项目（Gradle）

此章节依赖于上一章节的环境配置

1.  创建SpringBoot3项目，需要勾选`GraalVM Native Support`依赖 
2.  执行命令 

    ```shell
    gradlew nativeCompile
    ```

3. 运行

# GraalVM native-image编译JavaFX项目（Gradle）

请使用IDEA中的JavaFX创建项目

## 平台配置部分（Windows）

1. 下载gluon版本的[graalvm]([Release GraalVM CE Gluon 22.1.0.1-Final · gluonhq/graal (github.com)](https://github.com/gluonhq/graal/releases/tag/gluon-22.1.0.1-Final))（其它版本也可以，但是会有一些小bug）
2. 配置环境变量`GRAALVM_HOME`和`JAVA_HOME`，内容为下载的graalvm的解压路径；将二进制文件，即`%JAVA_HOME%\bin`添加到`Path`环境变量中
3. 下载native-image

    ```shell
    gu.cmd install native-image
    # 也可以先下载native-image的jar然后手动安装
    gu.cmd install -L <jar包路径>
    ```

4. 下载[Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/)

    > 选择以下组件
    >  
    > - 英语语言包
    > - 对v142生成工具的C++/CLI支持（或者之后的版本）
    > - MSVC v142 - VS 2019 C++x64/x86生成工具（或者之后的版本）
    > - Windows 10 SDK （10.0.19041.0 或者之后的版本）
    > - Windows Universal CRT SDK

5. 配置VS的环境变量，参考上方内容

## 插件配置部分

`build.gradle`

```groovy
// 在文件最上方添加
buildscript {
    repositories {
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }
    dependencies {
        classpath 'com.gluonhq:gluonfx-gradle-plugin:1.0.18'
    }
}

// 在plugins中添加插件
id 'com.gluonhq.gluonfx-gradle-plugin' version '1.0.18'

// 启用插件
apply plugin: 'com.gluonhq.gluonfx-gradle-plugin'

// 配置主启动类，记得修改成自己的主启动类的全限定名
mainClassName = 'com.example.title.DemoApplication'

// 添加两个任务
// 这个任务可能可以去掉
jar {
    manifest {
        // 记得修改成自己的主启动类的全限定名
        attributes 'Main-Class': 'com.example.title.DemoApplication'
    }
}
run {
    jvmArgs=["-agentlib:native-image-agent=config-merge-dir=src/main/resources/META-INF/native-image"]
}

// 插件的其他配置项，可以不写
gluonfx {
    target = "$target"
    attachConfig {
        version = "$version"
        configuration = "implementation";
        services "lifecycle", ...
    }

    bundlesList = []
    resourcesList = []
    reflectionList = []
    jniList = []

    compilerArgs = []
    linkerArgs = []
    runtimeArgs = []

    javaStaticSdkVersion = ""
    javafxStaticSdkVersion = ""
    graalvmHome = ""

    verbose = false
    enableSwRendering = false

    remoteHostName = ""
    remoteDir = ""
    
    release {
        // Android
        appLabel = ""
        versionCode = "1"
        versionName = "1.0"
        providedKeyStorePath = ""
        providedKeyStorePassword = ""
        providedKeyAlias = ""
        providedKeyAliasPassword = ""
        // iOS
        bundleName = ""
        bundleVersion = ""
        bundleShortVersion = ""
        providedSigningIdentity = ""
        providedProvisioningProfile = ""
        skipSigning = false
    }
}
```

`setting.gradle`

```groovy
// 在文件最上方添加
pluginManagement {
    repositories {
        gradlePluginPortal()
    }
}
```

## 终端命令部分

1. 启动终端（或者启动`x64 Native Tools Command Prompt for VS <year>`工具，则无需执行下面一行代码）

    ```shell
    cmd /k """E:\MicrosoftVisualStudio\2022\Enterprise\VC\Auxiliary\Build\vcvars64.bat"
    ```

2. 清理项目

    ```shell
    gradlew clean
    ```

3. 运行

    ```shell
    gradlew run
    ```

4. 编译

    ```shell
    gradlew nativeCompile nativeLink nativeBuild
    # 可以简写成
    gradlew nativeBuild
    ```

5. 本地运行

    ```shell
    gradlew nativeRun
    ```
