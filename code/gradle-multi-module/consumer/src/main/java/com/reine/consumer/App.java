package com.reine.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;

/**
 * @author reine
 */
// 排除掉R2dbcAutoConfiguration依赖项，禁止在启动时检查数据库连接，避免启动报错
// 配置自动扫描com.reine.http下所有bean
@SpringBootApplication(exclude = {R2dbcAutoConfiguration.class},
        scanBasePackages = {"com.reine.http", "com.reine.consumer"})
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
