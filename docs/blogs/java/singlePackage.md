---
title: Java项目打包成可执行jar文件
date: 2023/7/22
tags:
 - JavaFX
 - SpringBoot
categories:
 - java
---

# Java项目打包成可执行jar文件

## maven

### 非模块化项目

#### 使用 `maven-assembly-plugin`

[具体用法](https://maven.apache.org/plugins/maven-assembly-plugin/usage.html)

1. 插件引入

    ```xml
    <project>
        ...
        <build>
            ...
            <plugins>
                ...
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-assembly-plugin</artifactId>
                    <executions>
                        <execution>
                            <phase>package</phase>
                            <goals>
                                <goal>single</goal>
                            </goals>
                            <configuration>
                                <archive>
                                    <manifest>
                                    <!-- 配置主类 -->
                                        <mainClass>org.example.Main</mainClass>
                                    </manifest>
                                </archive>
                                <descriptorRefs>
                                    <descriptorRef>jar-with-dependencies</descriptorRef>
                                </descriptorRefs>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </project>    
    ```

2. 打包

    ```shell
    mvn package
    ```

3. 运行

    上一步操作会在项目目录下的`target`文件夹下生成两个jar包

    分别是`artifactId-version.jar`与`artifactId-version-jar-with-dependencies.jar`,

    其中`artifactId-version-jar-with-dependencies.jar`便是生成的可执行jar包


#### 使用 `maven-shade-plugin`

[具体用法](https://maven.apache.org/plugins/maven-shade-plugin/usage.html)

1. 插件引入

    ```xml
    <project>
        ...
        <build>
            ...
            <plugins>
                ...
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-shade-plugin</artifactId>
                    <executions>
                        <execution>
                            <goals>
                                <goal>shade</goal>
                            </goals>
                            <configuration>
                                <shadedArtifactAttached>true</shadedArtifactAttached>
                                <transformers>
                                    <transformer implementation=
                                                        "org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                        <mainClass>org.example.Main</mainClass>
                                    </transformer>
                                </transformers>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </project>    
    ```

2. 打包

    ```shell
    mvn package
    ```

3. 运行

    上一步操作会在项目目录下生成`dependency-reduced-pom.xml`以及`target`文件夹下会生成两个jar包

    分别是`artifactId-version.jar`与`artifactId-version-jar-shade.jar`,

    其中`artifactId-version-jar-shade.jar`便是生成的可执行jar包

### 非模块化项目（TODO）

## gradle

1. 向`build.gradle`中添加配置项

    ```groovy
    jar {
        manifest {
            attributes('Main-Class': 'org.example.App')
        }
        from {
            configurations.runtimeClasspath.collect {
                it.isDirectory() ? it : zipTree(it)
            }
        }
    }
    ```

2. 打包

    ```shell
    gradle jar
    ```

3. 运行

    上一步操作会在项目目录下的`build/libs`文件夹下生成一个可执行jar包
