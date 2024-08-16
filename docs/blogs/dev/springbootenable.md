---
title: EnableXXX 注解的实现方式
date: 2023/10/15
tags:
 - SpringBoot
---

# EnableXXX 注解的实现方式

> 需求: 在每周四访问RestApi接口时，返回KFC V Me 50错误信息

1. 引入依赖

   ```xml
   <dependencies>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
     </dependency>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-autoconfigure</artifactId>
     </dependency>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-configuration-processor</artifactId>
     </dependency>
     <dependency>
         <groupId>org.projectlombok</groupId>
         <artifactId>lombok</artifactId>
     </dependency>
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-aop</artifactId>
     </dependency>
   </dependencies>
   ```

2. 定义一个属性配置类，以读取自定义的配置属性

   ```java
   @Data
   @ConfigurationProperties(prefix = "kfc.crazy.thursday")
   public class ThursdayProperties {
   
     /**
     * 报错提示信息
     */
     private String errorMsg = "KFC Crazy Thursday Need $50";
   
     /**
     * 星期几执行，星期一到星期日对应1-7
     */
     private int day = 4;
   }    
   ```

3. 自定义一个异常类

   ```java
   package javax.io.trick; // 包名不能以java开头，其他随便，为了更加逼真
   
   public class NoMoneyException extends RuntimeException{
   
     public NoMoneyException(String message) {
         super(message);
     }
   }    
   ```

4. 切面类

   ```java
   @RequiredArgsConstructor
   @Aspect
   @Slf4j
   @EnableConfigurationProperties(ThursdayProperties.class)
   public class ThursdayAspect {
   
     private final ThursdayProperties thursdayProperties;
   
     /**
     * 切入点为@RestController注解的类中所有公开方法
     */
     @Pointcut(value = "execution(public * (@org.springframework.web.bind.annotation.RestController *).*(..))")
     public void allRestApi() {
     }
   
     @Around("allRestApi()")
     public Object aroundMethod(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
         Object result = proceedingJoinPoint.proceed();
         if (LocalDate.now().getDayOfWeek().getValue() == thursdayProperties.getDay()) {
             throw new NoMoneyException(thursdayProperties.getErrorMsg());
         } else return result;
     }
   }    
   ```

5. 异常处理类

   ```java
   @RestControllerAdvice
   public class NoMoneyExceptionHandle {
   
     @ExceptionHandler(value = NoMoneyException.class)
     public Object handle(NoMoneyException exception) {
         exception.printStackTrace();// 打印异常堆栈信息，有报错的感觉
         return exception.getMessage();
     }
   }    
   ```

6. @EnableXXX 注解类

   ```java
   @Target(ElementType.TYPE)
   @Retention(RetentionPolicy.RUNTIME)
   @Documented
   @Import(ThursdayAspect.class)// 导入单个bean
   public @interface EnableThursday {
   }
   ```

7. 可以 install 为 starter 给其他项目使用或者直接使用，即在启动类上加上 `@EnableThursday` 注解

## @Import注解的使用

TODO