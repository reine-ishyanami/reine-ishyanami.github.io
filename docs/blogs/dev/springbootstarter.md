---
title: SpringBootStarter 的构建
date: 2023/10/15
tags:
 - SpringBoot
---

# SpringBootStarter 的构建
1. 创建一个 SpringBoot 项目，引入依赖

   ```xml
   <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter</artifactId>
         <version>${spring-boot.version}</version>
     </dependency>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-configuration-processor</artifactId>
         <version>${spring-boot.version}</version>
     </dependency>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-autoconfigure</artifactId>
         <version>${spring-boot.version}</version>
     </dependency>
     <dependency>
         <groupId>com.fasterxml.jackson.core</groupId>
         <artifactId>jackson-databind</artifactId>
     </dependency>
   </dependencies>
   ```

2. 创建一个工具类，用以输出并自定义 Json 字符串

   ```java
   public class JsonService {
   
     private String prefixName;
   
     private String suffixName;
   
     private final ObjectMapper objectMapper = new ObjectMapper();
   
     public String objectToJson(Object object) {
         try {
             return prefixName + objectMapper.writeValueAsString(object) + suffixName;
         } catch (JsonProcessingException e) {
             throw new RuntimeException(e);
         }
     }
     // 省略getter setter
   }
   ```

3. 创建一个自定义的属性配置类

   ```java
   @ConfigurationProperties(prefix = "tojson.json") // 配置前缀
   public class JsonProperties {
     /**
      * 输出前缀
      */
     private String prefix = "@";
   
     /**
      * 输出后缀
      */
     private String suffix = "@";
     // 省略getter setter
   }
   ```

4. 创建一个自定义的自动配置类

   ```java
   @Configuration // 标识此类是配置类
   @ConditionalOnClass(JsonService.class) // 表示只有指定的class在classpath上时才能被注册
   @EnableConfigurationProperties(JsonProperties.class) // 激活@ConfigurationProperties
   public class JsonConfiguration {
   
     private final JsonProperties jsonProperties;
   
     public JsonConfiguration(JsonProperties jsonProperties){
         this.jsonProperties = jsonProperties;
     }
   
     @Bean
     @ConditionalOnMissingBean(JsonService.class)// 当容器没有此bean时，才注册
     public JsonService jsonService(){
         JsonService jsonService = new JsonService();
         jsonService.setPrefixName(jsonProperties.getPrefix());
         jsonService.setSuffixName(jsonProperties.getSuffix());
         return jsonService;
     }
   
   }    
   ```

5. 在项目资源目录下的 `META-INF/spring.factories` 中注册配置类

   ```properties
   org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.reine.config.JsonConfiguration
   ```

6. 使用 `mvn install` 将项目安装为本地依赖，可能出现此问题，无视即可

   > Unable to find main class

7. 在 `target/classes/META-INF/spring-configuration-metadata.json` 中可以看到类似如下配置

   ```json
   {
   "groups": [
     {
     "name": "tojson.json",
     "type": "com.reine.config.JsonProperties",
     "sourceType": "com.reine.config.JsonProperties"
     }
   ],
   "properties": [
     {
     "name": "tojson.json.prefix",
     "type": "java.lang.String",
     "description": "输出前缀",
     "sourceType": "com.reine.config.JsonProperties"
     },
     {
     "name": "tojson.json.suffix",
     "type": "java.lang.String",
     "description": "输出后缀",
     "sourceType": "com.reine.config.JsonProperties"
     }
   ],
   "hints": []
   }    
   ```

8. 在其他项目引入使用中使用

   ```xml
   <dependency>
     <groupId>com.reine</groupId>
     <artifactId>tojson-spring-boot-starter</artifactId>
     <version>0.0.1-SNAPSHOT</version>
   </dependency>    
   ```

9. 测试，*已省略创建SpringBoot入口程序类*

   ```java
   @SpringBootTest
   public class AppTests {
   
     @Autowired
     private JsonService jsonService;
   
     @Test
     void output() {
         Person person = new Person(20, "张三");
         System.out.println(jsonService.objectToJson(person));
     }
   
     public record Person(int age, String name){}
   }    
   ```
   > @{"age":20,"name":"张三"}@
