---
title: Java 项目如何在提交时检查代码格式
date: 2024/9/5
tags:
 - Java
---

# Java 项目如何在提交时检查代码格式

## 使用 Spotless 插件

[项目地址](https://github.com/diffplug/spotless)

### maven 插件引入方式

1. 在 `pom.xml` 文件中引入插件

    ```xml
    <plugin>
        <groupId>com.diffplug.spotless</groupId>
        <artifactId>spotless-maven-plugin</artifactId>
        <version>2.43.0</version>  <!--文章编写时的最新版本-->
        <configuration>
            <formats>
                <!-- you can define as many formats as you want, each is independent -->
                <format>
                    <!-- define the files to apply to -->
                    <includes>
                        <include>.gitattributes</include>
                        <include>.gitignore</include>
                    </includes>
                    <!-- define the steps to apply to those files -->
                    <trimTrailingWhitespace/>
                    <endWithNewline/>
                    <indent>
                        <tabs>true</tabs>
                        <spacesPerTab>4</spacesPerTab>
                    </indent>
                </format>
            </formats>
            <java>
                <palantirJavaFormat>
                    <version>2.50.0</version>                     <!-- optional -->
                    <style>PALANTIR</style>                       <!-- or AOSP/GOOGLE (optional) -->
                    <formatJavadoc>false</formatJavadoc>          <!-- defaults to false (optional, requires at least Palantir 2.39.0) -->
                </palantirJavaFormat>
            </java>
        </configuration>
    </plugin>
    ```

2. 编写 `.pre-commit-config.yaml` 预提交钩子文件，如果使用wrapper，可以改成使用 `./mvnw` 命令

    ```yaml
    fail_fast: false
    repos:
    - repo: local
        hooks:
        - id: format
            name: code format
            description: format files with spotless.
            language: system
            entry: bash -c 'mvn spotless:apply'  # 修改格式
        - id: check
            name: code check
            description: check files with spotless.
            language: system
            entry: bash -c 'mvn spotless:check'  # 检查格式
        - id: test
            name: code test
            description: run the testcase.
            language: system
            entry: bash -c 'mvn test'  # 执行测试
    ```

3. 执行 `pre-commit install` 安装钩子（需要先安装 `pre-commit` 命令）

4. 之后每次提交代码时，会自动检查代码格式并格式化代码。

### gradle 插件引入方式

1. 在 `build.gradle` 文件中引入插件

    ```groovy
    plugins {
        id "com.diffplug.spotless" version "6.25.0"
        id "com.palantir.java-format" version "2.50.0"
    }
    spotless {
        java {
            target 'src/main/java/**/*.java', 'src/main/test/**/*.java'
            removeUnusedImports()
            importOrder ''
            trimTrailingWhitespace()
            indentWithSpaces 4
            palantirJavaFormat("2.50.0").style("PALANTIR").formatJavadoc(false)
        }
    }
    ```

2. 编写 `.pre-commit-config.yaml` 预提交钩子文件，如果使用wrapper，可以改成使用 `./gradlew` 命令

    ```yaml
    fail_fast: false
    repos:
    - repo: local
        hooks:
        - id: format
            name: code format
            description: format files with spotless.
            language: system
            entry: bash -c 'gradle spotlessApply'
        - id: check
            name: code check
            description: check files with spotless.
            language: system
            entry: bash -c 'gradle check'
        - id: test
            name: code test
            description: run the testcase.
            language: system
            entry: bash -c 'gradle test'
    ```

3. 执行 `pre-commit install` 安装钩子（需要先安装 `pre-commit` 命令）

4. 之后每次提交代码时，会自动检查代码格式并格式化代码。