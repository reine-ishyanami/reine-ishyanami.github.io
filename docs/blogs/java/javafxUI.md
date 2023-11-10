---
title: 几种常用的JavaFX组件库或样式
date: 2023/11/10
tags:
 - JavaFX
categories:
 - java
---

# 几种常用的JavaFX组件库或样式

## AtlantaFX

> Modern JavaFX CSS theme collection with additional controls.

* [仓库主页](https://github.com/mkpaz/atlantafx)

### 示例代码

1. 引入依赖

    ```xml
    <dependency>
        <groupId>io.github.mkpaz</groupId>
        <artifactId>atlantafx-base</artifactId>
        <version>2.0.0</version>
    </dependency>    
    ```

2. 引入模块，在`module-info.java`中声明下列语句

    ```java
    requires atlantafx.base;
    ```

3. 主程序代码

    ```java
    public class AtlantaFXSample extends Application {
        @Override
        public void start(Stage primaryStage) throws Exception {
            Application.setUserAgentStylesheet(new PrimerLight().getUserAgentStylesheet());

            VBox root = new VBox(50);
            root.setAlignment(Pos.CENTER);
            Label label = new Label("");
            TextField textField = new TextField();
            textField.textProperty().bindBidirectional(label.textProperty());
            Button button = new Button("Hello");
            root.getChildren().addAll(label,textField, button);

            button.setOnAction(e-> textField.textProperty().unbindBidirectional(label.textProperty()));

            Scene scene = new Scene(root, 300, 400);

            primaryStage.setScene(scene);
            primaryStage.show();
        }
    }    
    ```

4. 效果
    
![atlantafx](../assets/javafxUI_01.png)
