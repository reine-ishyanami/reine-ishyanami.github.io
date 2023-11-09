---
title: JavaFX Fxml使用说明
date: 2023/8/6
tags:
 - JavaFX
categories:
 - java
---

# JavaFX Fxml使用说明

## 不通过控制器获取组件

1. 使用组件在父组件中的索引坐标查找组件（不推荐）
    ```java
    Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("/test1/test1.fxml")));
    ObservableList<Node> nodes = root.getChildrenUnmodifiable();TextField textField = (TextField) nodes.get(0);
    Button button = (Button) nodes.get(1);
    button.setOnAction(event -> textField.clear());
    ```

2. 使用CSS选择器查找组件（不推荐）

    * 通过标签选择器查找
        ```java
        TextField textField = (TextField) root.lookup("TextField");
        Button button = (Button) root.lookup("Button");
        button.setOnAction(event -> textField.clear());
        ``` 

    * 通过类选择器查找
        ```java
        TextField textField = (TextField) root.lookup(".text-field");  Button button = (Button) root.lookup(".button");
        button.setOnAction(event -> textField.clear());
        ```
    
    * 通过id选择器查找（fxml文件中Button组件应该设置`id=cssBtn`）
        ```java
        Button button = (Button) root.lookup("#cssBtn");
        button.setOnAction(event -> textField.clear());
        ```
    
3. 通过命名空间获取组件（推荐，组件必须设置`fx:id`属性，通过其对应的属性值获取组件）
    ```java
    FXMLLoader loader = new FXMLLoader();
    loader.setLocation(Objects.requireNonNull(getClass().getResource("/test3/test3.fxml")));
    Parent root = loader.load();
    ObservableMap<String, Object> namespace = loader.getNamespace();
    TextField tf = (TextField) namespace.get("tf");
    Button btn = (Button) namespace.get("btn");
    btn.setOnAction(event -> tf.clear());
    ```

## Controller初始化方法

> 在controller构造器中，所有的fxml组件均未被初始化，如果需要在展示界面时传递参数让界面展示时使用，需要在fxml的生命周期函数`initialize`中操作组件

1. 实现Initializable接口，重写initialize方法
    ```java
    public class MainController implements Initializable {
        @FXML
        private TextField tf;

        @FXML
        void onClearTextAction(ActionEvent event) {
        }

        @Override
        public void initialize(URL location, ResourceBundle resources) {
        }
    }
    ```

2. 使用@FXML注解标记initialize方法
    ```java
    public class MainController{
        // 下面两个字段可以省略
        @FXML
        private URL location;
        @FXML
        private ResourceBundle resources;

        @FXML
        private TextField tf;

        @FXML
        void onClearTextAction(ActionEvent event) {
        }

        @FXML
        void initialize() {
        }
    }   
    ```

## Controller构造器的传参

1. 如果fxml文件中指定了属性`fx:controller`，可以通过`setControllerFactory`方法使用该fxml文件的controller的构造器进行传参
    ```java
    FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("/test1/test1.fxml")));
    loader.setControllerFactory(param -> new MainController1("落红与孤鹜齐飞"));
    ```

2. 如果fxml文件中未指定属性`fx:controller`，可以通过`setController`方法使用controller的构造器进行传参
    ```java
    FXMLLoader loader = new FXMLLoader(Objects.requireNonNull(getClass().getResource("/test2/test2.fxml")));
    loader.setController(new MainController2("秋水共长天一色"));
    ```

## 多controller间通信
> 背景: 一个fxml文件中引入了其他的fxml文件，该如何获取此fxml文件中包含的其他fxml文件的控制器来操作其对应fxml文件中的组件

### 第一种方法，基于fxml文件

1. 在主fxml文件中引入其他fxml文件并指定`fx:id`
    ```xml
    <!--省略了一些导包、宽高、命名空间等无关配置-->
    <BorderPane fx:controller="com.reine.test.MainController">
        <bottom>
            <fx:include fx:id="bottom" source="bottom-pane.fxml" />
        </bottom>
        <center>
            <fx:include fx:id="center" source="center-pane.fxml" />
        </center>
    </BorderPane>
    ```

2. 在主控制器中注入另外两个fxml文件的控制器
    > 命名规则：需要在fxml文件中指定fx:id="xxx"，注入的controller命名为xxxController，其中xxx为fxml文件中定义的`fx:id`

    ```java
    public class MainController {
        @FXML
        BottomController bottomController;

        @FXML
        CenterController centerController;

        @FXML
        void initialize() {
            // 在另外两个控制器中定义mainController属性，以便组件通信，为了简化代码，该属性作用域定义为default
            bottomController.mainController = this;
            centerController.mainController = this;
        }
    }
    ```

### 第二种方法，基于Java代码（此方法亦适用于多窗口交互）
> 通过自定义一个控制器管理器管理所有fxml的控制器，在需要使用到某个控制器时，调用管理器中的对应控制器对象来操作组件

1. 定义一个控制器管理器
    ```java
    public class ControllerManager {

        /**
         * 私有化构造函数，避免其他类使用构造函数创建实例对象
         */
        private ControllerManager(){}

        public static Map<String, Object> controllerMap = new HashMap<>();
    }
    ```

2. 在各个fxml的控制器中，在初始化时将自身实例对象交给`ControllerManager`管理
    ```java
    public class ProducerController {
        /**
         * 其他非必要代码已省略
         */
        @FXML
        void initialize() {
            ControllerManager.controllerMap.put("producerController", this);
        }
    }
    ```

3. 在其他控制器中使用
    ```java
    public class ConsumerController {
        /**
         * 其他非必要代码已省略
         */
        @FXML
        void onAction(ActionEvent evnet) {
            ProducerController producerController = (ProducerController) ControllerManager.controllerMap.get("producerController");
        }
    }
    ```

### 第三种方法，通过事件总线
[具体代码](https://github.com/reine-ishyanami/test-fxml/tree/master/event-bus)


## 标签`<fx:root>`的使用

### 第一种使用方式，独立使用

1. 编写fxml文件`/fxml/inner.fxml`
    ```xml
    <fx:root alignment="CENTER" maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="300.0" prefWidth="450.0" spacing="50.0" type="VBox" xmlns="http://javafx.com/javafx/17.0.2" xmlns:fx="http://javafx.com/fxml/1">
        <children>
            <Text fx:id="text" strokeType="OUTSIDE" strokeWidth="0.0" />
            <!--此处由于没有在fxml中指定控制器，以及没有在控制器中定义方法，则showWelcomeText会报红，无视即可-->
            <Button mnemonicParsing="false" onAction="#showWelcomeText" text="click me!" />
        </children>
    </fx:root>
    ```

2. 编写控制器
    ```java
    public class MainLayout extends VBox {

        @FXML
        private Text text;

        public MainLayout() throws IOException {
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/fxml/inner.fxml"));
            fxmlLoader.setRoot(this);
            fxmlLoader.setController(this);
            fxmlLoader.load();
        }

        public String getText() {
            return this.textProperty().get();
        }

        public void setText(String value) {
            this.textProperty().set(value);
        }

        public StringProperty textProperty() {
            return text.textProperty();
        }

        @FXML
        protected void showWelcomeText() {
            text.setText("Hello World");
        }
    }
    ```

3. 启动时展示该页面
    ```java
    public class MainApp1 extends Application {
        // main方法可以省略
        public static void main(String[] args) {
            launch(args);
        }

        @Override
        public void start(Stage primaryStage) throws Exception {
            MainLayout root = new MainLayout();
            root.setText("Open with Application1");
            primaryStage.setScene(new Scene(root));
            primaryStage.setTitle("单文件测试");
            primaryStage.show();
        }
    }
    ```

### 第二种方法，作为其他fxml的子组件使用

```xml
<VBox alignment="CENTER" maxHeight="-Infinity" maxWidth="-Infinity" minHeight="-Infinity" minWidth="-Infinity" prefHeight="450.0" prefWidth="675.0" spacing="50.0" xmlns="http://javafx.com/javafx/17.0.2" xmlns:fx="http://javafx.com/fxml/1">
    <Text text="Outer"/>
    <MainLayout text="Inner"/>
</VBox>
```