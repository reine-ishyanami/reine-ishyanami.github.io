---
title: Java 基于 SpringBoot 框架使用 GraphQL 风格 API
date: 2024/4/14
tags:
 - SpringBoot
---

# Java 基于 SpringBoot 框架使用 GraphQL 风格 API

## GraphQL 简介

GraphQL 是一种用于 API 的查询语言，它为您的 API 定义了一个明确的语言来准确地请求所需的字段和数据。使用 GraphQL，您可以准确地描述您的数据，并按需获取它。

## 整合 SpringBoot

### 引入依赖

```groovy
implementation 'org.springframework.boot:spring-boot-starter-graphql'
implementation 'org.springframework.boot:spring-boot-starter-web'
testImplementation 'org.springframework.boot:spring-boot-starter-test'
testImplementation 'org.springframework:spring-webflux'
testImplementation 'org.springframework.graphql:spring-graphql-test'
```

### 编写 graphql 配置

```yaml
spring:
  graphql:
    graphiql:
      enabled: true
```

### 定义实体类

> 这里为了省略 service 层代码，将每个实体类对应的 service 层方法定义在实体类中

```java
public record Author(String id, String firstName, String lastName) {

    private static List<Author> authors = new ArrayList<>();

    static {
        authors.add(new Author("author-1", "Joshua", "Bloch"));
        authors.add(new Author("author-2", "Douglas", "Adams"));
        authors.add(new Author("author-3", "Bill", "Bryson"));
    }

    public static Author getById(String id) {
        return authors.stream()
                .filter(author -> author.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}
```

```java
public record Book(String id, String name, int pageCount, String authorId) {

    private static int autoIncrementId = 3;

    private static List<Book> books = new ArrayList<>();

    static {
        books.add(new Book("book-1", "Effective Java", 416, "author-1"));
        books.add(new Book("book-2", "Hitchhiker's Guide to the Galaxy", 208, "author-2"));
        books.add(new Book("book-3", "Down Under", 436, "author-3"));
    }

    public static Book getById(String id) {
        return books.stream()
                .filter(book -> book.id().equals(id))
                .findFirst()
                .orElse(null);
    }

    public static Book create(String name, int pageCount, String authorId) {
        Book book = new Book(String.format("book-%d", autoIncrementId++), name, pageCount, authorId);
        books.add(book);
        return book;
    }

    public static Book update(String id, String name, int pageCount, String authorId) {
        Iterator<Book> iterator = books.iterator();
        Book newBook = null;
        while (iterator.hasNext()) {
            Book book = iterator.next();
            if (book.id().equals(id)) {
                iterator.remove();
                newBook = new Book(id, name, pageCount, authorId);
                books.add(newBook);
                break;
            }
        }
        if (newBook == null) throw new RuntimeException("book has not exists");
        return newBook;
    }

    public static Book delete(String id) {
        Iterator<Book> iterator = books.iterator();
        Book removeBook = null;
        while (iterator.hasNext()) {
            Book book = iterator.next();
            if (book.id().equals(id)) {
                iterator.remove();
                removeBook = book;
                break;
            }
        }
        return removeBook;
    }
}
```

### 编写 GraphQL SDL （Schema Definition Language |schema定义语言）

> 在 `src/main/resource/graphql` 目录下创建 `schema.graphqls` 文件，内容如下

```graphql
type Query {
    hello: String  # 简易接口
    bookById(id: ID): Book  # 查询指定id的book
}

type Mutation {
    createBook(name: String, pageCount: Int, authorId: ID): Book  # 创建book
    updateBook(id: ID, name: String, pageCount: Int, authorId: ID): Book  # 更新book
    deleteBook(id: ID): Book  # 删除book
}

type Book {
    id: ID
    name: String
    pageCount: Int
    author: Author
}

type Author {
    id: ID
    firstName: String
    lastName: String
}
```

### 外部接口访问层 controller

```java
@Controller
public class BookController {

    @SchemaMapping
    public Author author(Book book) {
        return Author.getById(book.authorId());
    }

    @QueryMapping
    public Book bookById(@Argument String id) {
        return Book.getById(id);
    }

    @QueryMapping
    public String hello() {
        return "Hello GraphQL";
    }

    @MutationMapping
    public Book createBook(@Argument String name,
                           @Argument int pageCount,
                           @Argument String authorId) {
        return Book.create(name, pageCount, authorId);
    }

    @MutationMapping
    public Book updateBook(@Argument String id,
                           @Argument String name,
                           @Argument int pageCount,
                           @Argument String authorId) {
        return Book.update(id, name, pageCount, authorId);
    }

    @MutationMapping
    public Book deleteBook(@Argument String id) {
        return Book.delete(id);
    }
}
```

### 启动项目，测试

> 下面要用到的 graphql 请求文件 `bookDetails.graphql` 和 `bookOperations.graphql`

```graphql
query bookDetails($id: ID) {
    hello
    bookById(id: $id) {
        id
        name
        pageCount
        author {
            id
            firstName
            lastName
        }
    }
}
```

```graphql
mutation bookOperations($id: ID, $name: String, $pageCount: Int, $authorId: ID){
    createBook(name: $name, pageCount: $pageCount, authorId: $authorId){
        id
        name
        pageCount
        author {
            id
            firstName
            lastName
        }
    }
    
    updateBook(id: $id, name: $name, pageCount: $pageCount, authorId: $authorId){
        id
        name
        pageCount
        author {
            id
            firstName
            lastName
        }
    }
    
    deleteBook(id: $id){
        id
    }
}
```

#### 通过 webUI 进行测试

通过 [本地接口](http://localhost:8080/graphql) 访问，可以看到如下页面，编写graphql查询语句

![javaGraphql_01](../assets/javaGraphql_01.png)

#### 在同一个项目中的 test 模块中进行测试

> 需要将上面的 `bookDetails.graphql` 在 `src/test/resources/graphql-test` 目录下创建

```java
@GraphQlTest(BookController.class)
public class BookControllerTests {
    @Autowired
    private GraphQlTester graphQlTester;

    @Test
    void hello_test(){
        this.graphQlTester
                .documentName("bookDetails")
                .variable("id", "book-1")
                .execute()
                .path("hello").entity(String.class)
                .matches(str->"Hello GraphQL".equals(str));
    }

    @Test
    void shouldGetFirstBook() {
        this.graphQlTester
                .documentName("bookDetails")
                .variable("id", "book-1")
                .execute()
                .path("bookById")
                .matchesJson("""
                            {
                                "id": "book-1",
                                "name": "Effective Java",
                                "pageCount": 416,
                                "author": {
                                  "firstName": "Joshua",
                                  "lastName": "Bloch"
                                }
                            }
                        """);
    }
}
```

#### 使用另一个项目调用 API 接口

> 需要将上面的 `bookDetails.graphql` 在 `src/test/resources/graphql-documents` 目录下创建

1. 引入依赖

	```groovy
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
	implementation 'org.springframework.boot:spring-boot-starter-graphql'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-webflux'
	testImplementation('org.springframework.boot:spring-boot-starter-test')
	```

2. 创建客户端

	```java
	@Configuration
	public class GraphQLConfig {
	
		 @Bean
		 public HttpGraphQlClient client() {
			  WebClient webClient = WebClient.create("http://localhost:8080/graphql");
			  return HttpGraphQlClient.create(webClient);
		 }
	}
	```

3. 编写测试代码

   ```java
	@SpringBootTest
	public class AppTests {
	
		 @Autowired
		 private HttpGraphQlClient client;
	
		 @Test
		 void test_graphql_client() {
			  Book book = client
						 .documentName("bookDetails")
						 .variable("id", "book-1")
						 .retrieve("bookById")
						 .toEntity(Book.class)
						 .block();
			  System.out.println(book);
		 }
	
		 @Test
		 void test_graphql_test2() {
			  Assertions.assertEquals("Hello GraphQL", client.document("""
									{
									hello
									}""")
						 .retrieve("hello")
						 .toEntity(String.class)
						 .block());
		 }
	}
	```

