---
title: JavaFX 组件自适应宽高
date: 2023/1/18
tags:
 - JavaFX
---

# JavaFX 组件自适应宽高

> 下面案例实现的效果
> * 顶部，底部高度固定，宽度自适应
> * 中间部分高度自适应，左侧宽度自适应，右侧宽度自适应

![预览图](../assets/javafxAdaptive_01.png)


## 1. 在 controller 初始化方法编写组件自适应代码

1. `fxml`

   ```xml
   <VBox xmlns:fx="http://javafx.com/fxml"
     fx:controller="com.reine.adaptive.HelloController"
     prefWidth="320" prefHeight="240" fx:id="root">
     <StackPane fx:id="top" style="-fx-background-color: #ffffcc" prefHeight="50" />
   
     <HBox fx:id="middle" >
         <StackPane fx:id="left" style="-fx-background-color: #ff9999"/>
         <StackPane fx:id="right" style="-fx-background-color: #996699"/>
     </HBox>
   
     <StackPane fx:id="bottom" style="-fx-background-color: #ccffff" prefHeight="50" />
   </VBox>    
   ```

2. `controller`

   ```java
   public class HelloController {
     // 省略组件定义
     // ...
     @FXML
     void initialize() {
         ReadOnlyDoubleProperty widthProperty = root.widthProperty();
         ReadOnlyDoubleProperty heightProperty = root.heightProperty();
   
         top.prefWidthProperty().bind(widthProperty);
         bottom.prefWidthProperty().bind(widthProperty);
         middle.prefHeightProperty().bind(
                 heightProperty
                         .subtract(top.prefHeightProperty())
                         .subtract(bottom.prefHeightProperty())
         );
         // 1/3宽度
         left.prefWidthProperty().bind(
                 widthProperty
                         .divide(3.0)
         );
         // 2/3宽度
         right.prefWidthProperty().bind(
                 widthProperty
                         .divide(3.0)
                         .multiply(2.0)
         );
   
     }
   }    
   ```

3. `Aplication`

   ```java
   public class Hello1Application extends Application {
     @Override
     public void start(Stage stage) throws IOException {
         FXMLLoader fxmlLoader = new FXMLLoader(Hello1Application.class.getResource("hello1.fxml"));
         Scene scene = new Scene(fxmlLoader.load());
         stage.setTitle("Hello!");
         stage.setScene(scene);
         stage.show();
     }
   
     public static void main(String[] args) {
         launch();
     }
   }    
   ```

## 2. 在 fxml 文件中绑定宽高

这种方法无需在 controller 中编写 java 代码，但是有一个致命的问题是**先加入的组件无法使用后加入的组件的属性值**

1. `fxml`

   ```xml
   <?import javafx.scene.layout.*?>
   <VBox xmlns:fx="http://javafx.com/fxml"
     prefWidth="320" prefHeight="240" fx:id="root">
     <StackPane fx:id="top" style="-fx-background-color: #ffffcc" prefHeight="50" prefWidth="${root.width}"/>
     <!-- 这段代码会报错，原因是bottom为null，使用下面一行替代演示，不能实现实际效果 -->
     <!-- <HBox fx:id="middle" prefHeight="${root.height-top.height-bottom.height}"> -->
     <HBox fx:id="middle" prefHeight="200">
         <!-- prefWidth设置为根容器的1/3 -->
         <StackPane fx:id="left" style="-fx-background-color: #ff9999" prefWidth="${root.width/3}"/>
         <!-- prefWidth设置为根容器的2/3 -->
         <StackPane fx:id="right" style="-fx-background-color: #996699" prefWidth="${root.width/3*2}"/>
     </HBox>
     <StackPane fx:id="bottom" style="-fx-background-color: #ccffff" prefHeight="50" prefWidth="${root.width}"/>
   </VBox>
   ```

2. `Application`（同上，故省略）


## 3. 使用 layoutChildren 方法（使用fx:root写法）(推荐使用)

1. `fxml`

   ```xml
   <fx:root type="VBox" xmlns:fx="http://javafx.com/fxml"
     prefWidth="320" prefHeight="240" >
     <StackPane fx:id="top" style="-fx-background-color: #ffffcc" />
   
     <HBox fx:id="middle">
         <StackPane fx:id="left" style="-fx-background-color: #ff9999"/>
         <StackPane fx:id="right" style="-fx-background-color: #996699"/>
     </HBox>
   
     <StackPane fx:id="bottom" style="-fx-background-color: #ccffff" />
   </fx:root>    
   ```

2. `controller`

   ```java
   public class Hello3Controller extends VBox {
     // 省略组件定义
     // ...
     public Hello3Controller() throws IOException {
         FXMLLoader fxmlLoader = new FXMLLoader(Hello3Application.class.getResource("hello3.fxml"));
         fxmlLoader.setRoot(this);
         fxmlLoader.setController(this);
         fxmlLoader.load();
     }
   
     private boolean initialized = false;
   
     /**
      * layoutChildren方法每次改变界面时都会调用，故使用一个标志变量，使绑定宽高的代码只执行一次
      */
     @Override
     protected void layoutChildren() {
         super.layoutChildren();
         if (!initialized) {
             top.setPrefHeight(50);
             top.prefWidthProperty().bind(widthProperty());
             bottom.setPrefHeight(50);
             bottom.prefWidthProperty().bind(widthProperty());
             middle.prefHeightProperty().bind(
                     heightProperty()
                             .subtract(top.heightProperty())
                             .subtract(bottom.heightProperty())
             );
             left.prefWidthProperty().bind(
                     widthProperty()
                             .divide(3)
             );
             right.prefWidthProperty().bind(
                     widthProperty()
                             .divide(3)
                             .multiply(2)
             );
             initialized = true;
         }
     }
   }
   ```

3. `Application`

   ```java
   public class Hello3Application extends Application {
     @Override
     public void start(Stage stage) throws IOException {
         Scene scene = new Scene(new Hello3Controller());
         stage.setTitle("Hello!");
         stage.setScene(scene);
         stage.show();
     }
     public static void main(String[] args) {
         launch();
     }
   }    
   ```