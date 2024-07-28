---
title: SpringBoot 中使用 Redis Stream 数据类型实现消息队列
date: 2023/8/11
tags:
 - SpringBoot
categories:
 - dev
---

# SpringBoot 中使用 Redis Stream 数据类型实现消息队列
## 工具类
> 用于操作 redis 中的 stream 数据类型，在后续代码中会注入此工具类使用

```java
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.stream.Record;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Objects;

/**
 * 使用redis的stream数据类型实现消息队列
 */
@Component
@RequiredArgsConstructor
public class RedisStreamUtils {

    private final StringRedisTemplate redisTemplate;

    /**
     * 创建消费组
     *
     * @param key   键
     * @param group 组名称
     * @return {@link String}
     */
    public String createGroup(String key, String group) {
        return redisTemplate.opsForStream().createGroup(key, group);
    }

    /**
     * 添加map消息
     *
     * @param key   键
     * @param value 值
     * @return {@link String}
     */
    public String addMap(String key, Map<String, String> value) {
        return Objects.requireNonNull(redisTemplate.opsForStream().add(key, value)).getValue();
    }

    /**
     * 添加record消息
     *
     * @param record 消息
     * @return {@link String}
     */
    public String addRecord(Record<String, Object> record) {
        return Objects.requireNonNull(redisTemplate.opsForStream().add(record)).getValue();
    }

    /**
     * 确认消费
     *
     * @param key       键
     * @param group     组
     * @param recordIds 消息id
     * @return {@link Long}
     */
    public Long ack(String key, String group, String... recordIds) {
        return redisTemplate.opsForStream().acknowledge(key, group, recordIds);
    }

    /**
     * 删除消息，当一个节点的所有消息都被删除，那么该节点会自动销毁
     *
     * @param key       键
     * @param recordIds 消息id
     * @return {@link Long}
     */
    public Long delete(String key, String... recordIds) {
        return redisTemplate.opsForStream().delete(key, recordIds);
    }
}
```

## 常量类
> 在后续代码中使用的的 `key` `group` `consumer` 名称会从此常量类中获取

```java
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constant {
    // key
    public static final String REDIS_STREAM = "redis-stream";
    // group
    public static final String REDIS_STREAM_CONSUMER_GROUP = "mail-group";
    // consumer
    public static final String REDIS_STREAM_CONSUMER = "mail-consumer";
}
```

## 消费者 
> `consumer` 负责将队列中的消息取出进行后续操作，并自动提交

```java
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.RecordId;
import org.springframework.data.redis.stream.StreamListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class Listener implements StreamListener<String, MapRecord<String, String, String>> {

    private final RedisStreamUtils streamUtils;

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        String stream = message.getStream();
        RecordId id = message.getId();
        Map<String, String> data = message.getValue();
        streamUtils.delete(stream, id.getValue());// ack
        // 省略后续操作
    }
}
```

## 配置类
> 配置消费组和消费者对象，以及将被消费者消费的 `stream` 的 `key`

```java
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.RedisSystemException;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.util.ErrorHandler;

import java.time.Duration;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * redis stream消息队列配置类
 */
@Configuration
@RequiredArgsConstructor
public class RedisStreamConfiguration {

    private final RedisConnectionFactory factory;

    private final Listener listener;

    private final StringRedisTemplate template;

    @PostConstruct
    public void initConsumerGroup() {
        try {
            template.opsForStream().createGroup(Constant.REDIS_STREAM, Constant.REDIS_STREAM_CONSUMER_GROUP);
        } catch (RedisSystemException ignore) {
            //避免组已存在异常 BUSYGROUP Consumer Group name already exists
        }
    }    

    /**
     * 此注解参数表示该bean在被创建时，调用bean的start方法，在被销毁时，调用bean的stop方法
     */
    @Bean(initMethod = "start", destroyMethod = "stop")
    public StreamMessageListenerContainer<String, MapRecord<String, String, String>> container() {
        // 创建线程池
        AtomicInteger index = new AtomicInteger(1);
        int processors = Runtime.getRuntime().availableProcessors();
        ThreadPoolExecutor executor = new ThreadPoolExecutor(processors, processors, 0, TimeUnit.SECONDS,
                new LinkedBlockingDeque<>(), r -> {
            Thread thread = new Thread(r);
            thread.setName("async-stream-consumer-" + index.getAndIncrement());
            thread.setDaemon(true);
            return thread;
        });

        StreamMessageListenerContainer.StreamMessageListenerContainerOptions<String, MapRecord<String, String, String>> options =
                StreamMessageListenerContainer.StreamMessageListenerContainerOptions
                        .builder()
                        // 一次最多获取多少条消息
                        .batchSize(1)
                        // 运行 Stream 的 poll task
                        .executor(executor)
                        // Stream 中没有消息时，阻塞多长时间，需要比 `spring.data.redis.timeout` 的时间小
                        .pollTimeout(Duration.ofSeconds(3))
                        // 获取消息的过程或获取到消息给具体的消息者处理的过程中，发生了异常的处理
                        .errorHandler(new StreamErrorHandler())
                        .build();

        StreamMessageListenerContainer<String, MapRecord<String, String, String>> container =
                StreamMessageListenerContainer.create(factory, options);

        // 消费组，自动ack
        container.receiveAutoAck(
                Consumer.from(
                        Constant.REDIS_STREAM_CONSUMER_GROUP,
                        Constant.REDIS_STREAM_CONSUMER
                ),
                StreamOffset.create(Constant.REDIS_STREAM, ReadOffset.lastConsumed()),
                listener // 绑定消费者
        );
        return container;
    }

    @Slf4j
    private static class StreamErrorHandler implements ErrorHandler {
        @Override
        public void handleError(Throwable t) {
            log.error("redis stream exception: {}", t.getMessage());
        }
    }
}
```

*为了简化代码，可以将线程池创建代码改为，但可能会影响性能*

```java
ExecutorService executor = Executors.newCachedThreadPool();
```

## 生产者
> 将消息投递到对应 `key` 的 `stream` 数据类型中，供给对应消费者

```java
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Test{

    private final RedisStreamUtils streamUtils;

    public void test() {
        Map<String, String> data = Map.of("data", "12343242342");
        String res = streamUtils.addMap(Constant.REDIS_STREAM, data);// 推送验证信息指定消息队列中
    }
}
```