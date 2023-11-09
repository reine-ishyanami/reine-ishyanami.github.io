---
title: SpringBoot整合JavaFX
date: 2023/9/13
tags:
 - SpringBoot
 - JavaFX
categories:
 - java
---

# SpringBoot整合JavaFX
## 第一种方案，通过引用第三方jar包，整合JavaFX（oracle jdk8）

1. 引入依赖
    ```xml
    <dependency>
        <groupId>de.roskenet</groupId>
        <artifactId>springboot-javafx-support</artifactId>
        <version>2.1.6</version>
    </dependency>
    ```

2. 创建fxml文件，如`main.fxml`
    ```xml
    <!--导包已省略-->
    <VBox xmlns="http://javafx.com/javafx"
        xmlns:fx="http://javafx.com/fxml"
        fx:controller="com.reine.testsbfxdemo.controller.Main"
        prefHeight="400.0" prefWidth="600.0" alignment="CENTER">
        <Text fx:id="text" text="Hello World"/>
        <Button onAction="#modifyText" text="click me"/>
    </VBox>
    ```

3. 创建对应控制器`Main.java`
    ```java
    @FXMLController
    public class Main {

        @FXML
        private Text text;

        @Value("${test.property}")
        private String property;

        @FXML
        void modifyText(ActionEvent actionEvent) {
            text.setText(property);
        }
    }
    ```

4. 创建视图类
    ```java
    @Component
    @FXMLView("/main.fxml")
    public class MainView extends AbstractFxmlView {
    }
    ```

5. 启动类
    ```java
    @SpringBootApplication
    public class TestSbFxDemoApplication extends AbstractJavaFxApplicationSupport {

        public static void main(String[] args) {
            launch(TestSbFxDemoApplication.class, MainView.class, args);
        }

    }
    ```

6. 启动时效果
    ![starting](../assets/javafxSpringboot_01.png)

7. 启动完成后效果
    ![started](../assets/javafxSpringboot_02.png)

8. 配置文件参数
    ```yml
    javafx:
      stage:
        style: # 主窗口样式 DECORATED UNDECORATED TRANSPARENT UTILITY UNIFIED
        width: # 主窗口宽度
        height: # 主窗口高度
        resizable: # 主窗口是否可以调整大小 true false
        appicons: # 主窗口的图标, 例如/images/logo.png可以读取到resources下的images目录下的logo.png
      title: # 主窗口的标题    
    ```


## 第二种方案，通过SpringBoot的事件发布订阅机制（oracle jdk8）

1. 创建fxml文件，如`main.fxml`
    ```xml
    <!--导包已省略-->
    <VBox xmlns="http://javafx.com/javafx"
        xmlns:fx="http://javafx.com/fxml"
        fx:controller="com.reine.testsbfxdemo.controller.Main"
        prefHeight="400.0" prefWidth="600.0" alignment="CENTER">
        <Text fx:id="text" text="Hello World"/>
        <Button onAction="#modifyText" text="click me"/>
    </VBox>
    ```

2. 创建对应控制器`Main.java`
    ```java
    @Component
    public class Main {

        @FXML
        private Text text;

        @Value("${test.property}")
        private String property;

        @FXML
        void modifyText(ActionEvent actionEvent) {
            text.setText(property);
        }
    }
    ```

3. 要进行发布的事件`StageReadyEvent`
    ```java
    public class StageReadyEvent extends ApplicationEvent {
        /**
         * 这里的形参也可以是一个更加复杂的对象；
         * 比如用一个新的对象将stage、fxml、title等需要自定义的参数封装成一个对象，
         * 再通过getSource()返回这整个对象以供给监听器使用；
         * 这里为了简单演示，只传递了stage对象
         */
        public StageReadyEvent(Stage stage) {
            super(stage);
        }

        public Stage getStage() {
            return (Stage) getSource();
        }
    } 
    ```

4. 对应的事件监听者`StageInitializer`
    ```java
    @Component
    @RequiredArgsConstructor
    public class StageInitializer implements ApplicationListener<StageReadyEvent> {

        /**
         * 这个属性也可以通过event进行传递
         */
        @Value("classpath:/main.fxml")
        private Resource defaultFxml;

        private final ApplicationContext applicationContext;

        @Override
        public void onApplicationEvent(StageReadyEvent event) {
            try {
                FXMLLoader loader = new FXMLLoader(defaultFxml.getURL());
                // 让fxml从springbean中拿到交由spring管理的controller；
                // 否则则controller中将无法使用spring的依赖注入
                loader.setControllerFactory(applicationContext::getBean);
                Parent root = loader.load();
                // 从事件中拿到stage对象
                Stage stage = event.getStage();
                stage.setScene(new Scene(root));
                stage.show();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }    
    ```

5. 启动类
    ```java
    @SpringBootApplication
    public class TestSbFxDemoApplication extends Application {
        private ConfigurableApplicationContext applicationContext;

        public static void main(String[] args) {
            launch(args);
        }

        @Override
        public void start(Stage primaryStage) throws Exception {
            // 发布事件，引导监听器工作
            applicationContext.publishEvent(new StageReadyEvent(primaryStage));
        }

        @Override
        public void init() throws Exception {
            applicationContext = new SpringApplicationBuilder(TestSbFxDemoApplication.class).run();
        }

        @Override
        public void stop() throws Exception {
            applicationContext.close();
            Platform.exit();
        }
    }    
    ```

6. 启动时不会像上一种方式有加载动画，而是启动完成后直接展示窗口

## jdk11及以上的写法
> 由于jdk11后oracle jdk移除了JavaFX模块，故使用JavaFX时需要引入`javafx-control`和`javafx-fxml`两个第三方包，并且javafx的类库需要使用java的模块化进行加载，而springboot包没有支持java的模块化，故不可以与普通javafx项目一样添加`module-info.java`文件并声明引入的包。但是可以使用匿名模块的方式启动JavaFX程序，

**示例如下：在原有代码的基础上，新建一个启动类，在该启动类中启动JavaFX的主程序**

```java
public class Launcher {
    public static void main(String[] args) {
        TestSbFxDemoApplication.main(args);
    }
}
```

*启动时会有如下警告，无视即可*
> 9月 13, 2023 6:32:28 下午 com.sun.javafx.application.PlatformImpl startup
> 
> 警告: Unsupported JavaFX configuration: classes were loaded from 'unnamed module @6909b2de'