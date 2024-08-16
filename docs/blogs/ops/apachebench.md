---
title: Apache Bench 接口压测工具的使用
date: 2024/3/30
tags:
  - Console
---

# Apache Bench接口压测工具的使用

## 性能测试指标

**并发数(concurrent)**: 某个时间范围内。同时在使用系统的用户个数。从实际场景来看，并发数就是同时使用该服务器接口的客户端数，这些客户端可能调用不同的API。严格意义上来说，并发数是指同时请求同一个API的用户个数。

**每秒查询数(QPS)**: QPS是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准。QPS = 并发数 /
平均请求响应时间。QPS就是一秒内查询完成的次数。

**每秒事务数(TPS)**: 一个事务是指客户端向服务器发送请求，然后服务器做出反应的过程。客户端在发送请求时开始计时，收到服务器响应后结束计时，以此来计算使用的时间和完成的事务个数。TPS就是一秒内处理事务完成的次数。

1. TPS和QPS有什么区别？

   > 如果是对一个查询接口（单场景）压测，且这个接口内部不会再去请求其他接口，那么 TPS=QPS，否则，TPS≠QPS。如果是对多个接口（混合场景）压测，假设
   > N 个接口都是查询接口，且这个接口内部不会再去请求其他接口，QPS=N*TPS。

2. QPS和并发数是怎么样的关系？

   > QPS = 并发数 / 平均请求响应时间。比如我们有500个客户端，并发对API发起请求，平均的请求返回时间是200ms，那么我们可以算出该接口的QPS=500/0.2=2500。
   >
   > 在并发数设置过大时，API 同时要处理很多请求，会频繁切换上下文，而真正用于处理请求的时间变少，反而使得 QPS
   > 会降低。并发数设置过大时，请求响应时间也会变长。API 会有一个合适的并发数，在该并发数下，API 的 QPS
   > 可以达到最大，但该并发数不一定是最佳并发数，还要参考该并发数下的平均请求响应时间。

3. 哪些指标最能反应API的处理性能？

   > 衡量 API 性能的最主要指标是 QPS，但是在说明 QPS 时，需要指明是多少并发数下的 QPS，否则毫无意义，因为不同并发数下的 QPS
   > 是不同的。举个例子，单用户 100 QPS 和 100 用户 100 QPS 是两个不同的概念，前者说明 API 可以在一秒内串行执行 100
   > 个请求，而后者说明在并发数为 100 的情况下，API 可以在一秒内处理 100 个请求。当 QPS 相同时，并发数越大，说明 API
   > 性能越好，并发处理能力越强。当然上文也提到了，做性能评估时还需参考该并发数下的平均请求响应时间，如果并发数大的但平均请求响应时间还是很稳定，那么说明该API性能越好。

## Apache Bench使用

[官方地址](https://httpd.apache.org/)

1. 安装方法

   ```shell
   apt install apache2-utils  # debian系
   yum install httpd-tools -y  # redhat系
   brew install httpd-tools  # macOS
   scoop install apache  # windows
   ```

2. 命令基本使用:

   ```shell
   ab -t 5 -n 100 -c 10 http://localhost:8080/text  # 5秒内，并发数为10，请求100次
   ```

3. 输出内容解释

   ```text
   This is ApacheBench, Version 2.3 <$Revision: 1903618 $>
   Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
   Licensed to The Apache Software Foundation, http://www.apache.org/
   
   Benchmarking localhost (be patient).....done
   
   Server Software:
   Server Hostname:        localhost  # 主机地址
   Server Port:            8080  # 主机端口
   
   Document Path:          /text  # 请求路径
   Document Length:        775 bytes  # 文档长度
   
   Concurrency Level:      10  # 并发数
   Time taken for tests:   2.689 seconds  # 总共花费的时间
   Complete requests:      100  # 完成的请求数
   Failed requests:        0  # 失败的请求数
   Total transferred:      97500 bytes  # 总共传输字节数，包含http的头信息等
   HTML transferred:       77500 bytes  # html字节数，实际的页面传递字节数
   Requests per second:    37.19 [#/sec] (mean)  # QPS，反应服务器的吞吐量
   Time per request:       268.892 [ms] (mean)  # 用户平均请求等待时间
   Time per request:       26.889 [ms] (mean, across all concurrent requests)  # 服务器平均处理时间，上面的Time per request/Concurrency Level就是本项的值
   Transfer rate:          35.41 [Kbytes/sec] received  # 每秒获取的数据长度
   
   Connection Times (ms)
   min  mean[+/-sd] median   max
   Connect:        0    0   0.3      0       1
   Processing:    17   65  26.7     65     103
   Waiting:       13   61  26.3     63     101
   Total:         18   65  26.6     65     103
   
   Percentage of the requests served within a certain time (ms)
   50%     65  # 50%的请求在65ms内返回 
   66%     83
   75%     91
   80%     93
   90%     98
   95%     99
   98%    103
   99%    103
   100%    103 (longest request)
   ```

4. 其他参数说明

   | 参数 | 说明                                                                                       |
         |----|------------------------------------------------------------------------------------------|
   | -n | 即requests，用于指定压力测试总共的执行次数。                                                               |
   | -c | 即concurrency，用于指定压力测试的并发数。                                                               |
   | -t | 即timelimit，等待响应的最大时间(单位：秒)。                                                              |
   | -b | 即windowsize，TCP发送/接收的缓冲大小(单位：字节)。                                                        |
   | -p | 即postfile，发送POST请求时需要上传的文件，此外还必须设置-T参数。                                                  |
   | -u | 即putfile，发送PUT请求时需要上传的文件，此外还必须设置-T参数。                                                    |
   | -T | 即content-type，用于设置Content-Type请求头信息，例如：application/x-www-form-urlencoded，默认值为text/plain。 |
   | -v | 即verbosity，指定打印帮助信息的冗余级别。                                                                |
   | -w | 以HTML表格形式打印结果。                                                                           |
   | -i | 使用HEAD请求代替GET请求。                                                                         |
   | -x | 插入字符串作为table标签的属性。                                                                       |
   | -y | 插入字符串作为tr标签的属性。                                                                          |
   | -z | 插入字符串作为td标签的属性。                                                                          |
   | -C | 添加cookie信息，例如：“Apache=1234”(可以重复该参数选项以添加多个)。                                             |
   | -H | 添加任意的请求头，例如：“Accept-Encoding: gzip”，请求头将会添加在现有的多个请求头之后(可以重复该参数选项以添加多个)。                  |
   | -A | 添加一个基本的网络认证信息，用户名和密码之间用英文冒号隔开。                                                           |
   | -P | 添加一个基本的代理认证信息，用户名和密码之间用英文冒号隔开。                                                           |
   | -X | 指定使用的代理服务器和端口号，例如:“126.10.10.3:88”。                                                      |
   | -V | 打印版本号并退出。                                                                                |
   | -k | 使用HTTP的KeepAlive特性。                                                                      |
   | -d | 不显示百分比。                                                                                  |
   | -S | 不显示预估和警告信息。                                                                              |
   | -g | 输出结果信息到gnuplot格式的文件中。                                                                    |
   | -e | 输出结果信息到CSV格式的文件中。                                                                        |
   | -r | 指定接收到错误信息时不退出程序。                                                                         |
   | -h | 显示用法信息，其实就是ab -help。                                                                     |
