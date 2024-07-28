---
title: CompletableFuture 使用
date: 2024/5/6
tags:
 - Java
categories:
 - dev
---

# CompletableFuture 使用

> CompletableFuture 主要是用于异步调用，内部封装了线程池，可以将请求或者处理过程，进行异步处理。创建线程有3种方式，直接继承 Thread、实现 Runnable 接口、实现 Callable 接口。

## CompletableFuture 与 Future 的区别

1. 异步操作

   * Future 代表一个异步计算的结果，但它的功能有限。你可以通过 get() 方法获取结果，但如果计算尚未完成，它会阻塞当前线程，直到计算完成或者超时。
   
   * CompletableFuture 不仅代表了异步计算的结果，还可以控制这个计算的执行。你可以手动完成（或者异常完成）计算，也可以组合多个 CompletableFuture 实例，实现复杂的异步操作链。

2. 回调

	* Future 没有提供直接的回调机制，你需要手动检查计算是否完成，然后获取结果。

	* CompletableFuture 支持回调机制，可以在计算完成时自动触发回调函数，而不需要手动轮询或阻塞。

3. 异常处理

	* Future 不能直接处理计算过程中的异常，你需要在 get() 方法中捕获异常。

   * CompletableFuture 提供了 exceptionally() 方法，可以在计算过程中发生异常时自动触发回调函数。

4. 组合操作

	* Future 没有直接支持组合操作，你需要手动编写代码来实现。

   * CompletableFuture 提供了一系列方法，如 thenApply(), thenAccept(), thenCombine() 等，用于组合多个异步计算的结果。

## CompletableFuture 常用方法

1. 预定义的几个函数式方法，分别表示

	* runnable（无入参无返回值方法）
		
		```java
		private void runnable() {
			 System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 try {
				  long random = (long) (Math.random() * 1000L);
				  Thread.sleep(random);
			 } catch (InterruptedException e) {
				  throw new RuntimeException(e);
			 }
			 count[0] += 2;
			 System.out.printf("%15s: %sEND\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
		}
		```
   
   * consumer（有入参无返回值方法）
   
		```java
		private void consumer(Integer count) {
			 System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 System.out.println("count = " + count);
		}
		```
   
   * supplier（无入参有返回值方法）

		```java
		private Integer supplier() {
			 System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 return count[0] + count[1];
		}
		```

   * function（有入参有返回值方法）
   
		```java
		private boolean function(Integer count) {
			 System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 System.out.println("count = " + count);
			 return true;
		}
		```

	* exceptionHandler（此方法用于异常处理）

		```java
		private Integer exceptionHandler(Throwable throwable) {
			 System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 System.out.println("throwable = " + throwable);
			 return 100;
		}
		```

   * action（同时处理前一阶段产生的异常或者成功执行的返回值）

		```java
		private <T> void action(T res, Throwable throwable) {
			 System.out.printf("\t%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
			 System.err.println("\tres = " + res);
			 System.err.println("\texception = " + throwable);
			 throw new RuntimeException("验证异常");
		}
		```
  
2. 常用的方法，每一个方法都可以指定一个自定义线程池，置于第二个参数

   * runAsync(Runnable runnable) 执行异步任务

	   ```java
	   CompletableFuture.runAsync(this::runnable, executor);
	   ```
   
	* supplyAsync(Supplier supplier) 执行带返回结果的异步任务
   
      ```java
      CompletableFuture.supplyAsync(this::supplier, executor);
      ```
   
	* whenCompleteAsync(BiConsumer action) 任务执行完成时的操作
   
      ```java
      CompletableFuture.runAsync(this::runnable, executor).whenCompleteAsync(this::action, executor);
      ```
   
	* exceptionally(Function fn) 出现异常时的操作，这个方法不可指定线程池

		```java
		CompletableFuture.supplyAsync(this::supplier, executor).whenCompleteAsync(this::action, executor).exceptionally(this::exceptionHandler);
		```
   
	* thenRunAsync(Runnable runnable) 前一个任务完成后的下一个操作

		```java
  		CompletableFuture.runAsync(this::runnable, executor).thenRunAsync(this::runnable, executor);
  		```

	* thenAcceptAsync(Consumer consumer) 使用前一个任务的执行结果进行下一步操作

	   ```java
	   CompletableFuture.supplyAsync(this::supplier, executor).thenAcceptAsync(this::consumer, executor);
      ```

	* thenApplyAsync(Function function) 使用前一个任务的执行结果进行下一步操作并返回结果

	   ```java
	   CompletableFuture.supplyAsync(this::supplier, executor).thenApplyAsync(this::function, executor);
      ```

	* runAfterBothAsync(CompletionStage future2, Runnable action) 顺序执行，执行顺序为 future1，future2，task，即 task 在前面两个任务执行完成后执行

	   ```java
	   future1.runAfterBothAsync(future2, this::runnable, executor);
      ```

	* thenAcceptBothAsync(CompletionStage future2, BiConsumer consumer) 顺序执行，执行顺序为 future1，future2，task，即 task 在前面两个任务执行完成后执行，并且 task 的参数为 future1 和 future2 的返回值

	   ```java
	   future1.thenAcceptBothAsync(future2, biConsumer, executor);
      ```
   
	* thenCombineAsync(CompletionStage future2, BiFunction function) 顺序执行，执行顺序为 future1，future2，task，即 task 在前面两个任务执行完成后执行，并且 task 的参数为 future1 和 future2 的返回值，返回一个新的返回结果
   
		```java
		future1.thenCombineAsync(future2, biFunction, executor);
      ```

	* runAfterEitherAsync(CompletionStage future2, Runnable runnable) 两个任务任意一个任务执行完成，执行 task 任务
   
		```java
	   future1.runAfterEitherAsync(future2, runnable, executor);
	   ```
  
	* acceptEitherAsync(CompletionStage future2, Consumer consumer) 两个任务任意一个任务执行完成，执行 task 任务，将那个完成了的任务的返回值作为参数传递
   
	   ```java
	   future1.acceptEitherAsync(future2, consumer, executor);
	   ```
   
	* applyToEitherAsync(CompletionStage future2, Function function) 两个任务任意一个任务执行完成，执行 task 任务，将那个完成了的任务的返回值作为参数传递，返回一个新的返回结果
   	
		```java
		future1.applyToEitherAsync(future2, task, executor);
      ```
   
	* allOf(CompletableFuture... futures) 组合任务中的所有任务执行完成后执行任务
   
		```java
	   CompletableFuture.allOf(future1, future2, future3).thenRunAsync(() -> {
	      System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
	   }, executor);
	   ```
  
	* anyOf(CompletableFuture... futures) 组合任务中的任意任务执行完成后执行任务

	   ```java
	   CompletableFuture.anyOf(future1, future2, future3).thenRunAsync(() -> {
	   	System.out.printf("%15s: %s\n", Thread.currentThread().getName(), LocalTime.now().format(formatter));
	   }, executor);
	   ```
  