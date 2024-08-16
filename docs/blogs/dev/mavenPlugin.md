---
title: Maven 插件开发
date: 2024/7/3
tags:
 - Java
---


# Maven 插件开发

## 插件配置

> 编写插件的模块不应作为使用插件模块的子模块

1. 依赖引入

    ```xml
        <dependencies>
            <dependency>
                <groupId>org.apache.maven</groupId>
                <artifactId>maven-plugin-api</artifactId>
                <version>3.9.5</version>
            </dependency>
            <dependency>
                <groupId>org.apache.maven.plugin-tools</groupId>
                <artifactId>maven-plugin-annotations</artifactId>
                <version>3.10.2</version>
                <scope>provided</scope>
            </dependency>
        </dependencies>

        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.11.0</version>
                    <configuration>
                        <source>${maven.compiler.source}</source>
                        <target>${maven.compiler.target}</target>
                    </configuration>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-plugin-plugin</artifactId>
                    <version>3.10.2</version>
                    <configuration>
                        <!--配置插件组名称-->
                        <goalPrefix>reine</goalPrefix>
                        <skipErrorNoDescriptorsFound>true</skipErrorNoDescriptorsFound>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    ```

2. 插件执行逻辑代码

    ```java
    package org.example.plugin;

    import org.apache.maven.plugin.AbstractMojo;
    import org.apache.maven.plugin.MojoExecutionException;
    import org.apache.maven.plugins.annotations.LifecyclePhase;
    import org.apache.maven.plugins.annotations.Mojo;
    import org.apache.maven.plugins.annotations.Parameter;

    /**
     * 指定名称为hello，在运行mvn compile时执行本插件
     *
     * @author reine
     * 2024/1/30 14:50
     */
    @Mojo(name = "hello", defaultPhase = LifecyclePhase.COMPILE)
    public class HelloWorldMojo extends AbstractMojo {

        /**
         * 配置的是本maven插件的配置，在pom使用configuration标签进行配置 property就是名字<br/>
         * 在配置里面的标签名字。在调用该插件的时候会看到
         */
        @Parameter(property = "application")
        private String application;


        public void execute() throws MojoExecutionException {
            System.err.printf("Hello %s\n", application);
            getLog().error(String.format("HelloWorld Maven Plugin, Application Name: %s", application));
        }
    }
    ```

3. 执行安装

    ```shell
    mvn install
    ```

## 使用插件

> 另起一个项目，项目与插件项目同级或者无关联

1. 引入插件

    ```xml
        <plugins>
            <plugin>
                <groupId>org.example</groupId>
                <artifactId>helloworld-plugin</artifactId>
                <version>1.0</version>
                <configuration>
                    <!--上面插件定义的配置项-->
                    <application>test</application>
                </configuration>
            </plugin>
        </plugins>
    ```

2. 执行插件命令

    ```shell
    mvn reine:hello
    ```

3. 输出

    ![plugin output](../assets/mavenPlugin_01.png)
`