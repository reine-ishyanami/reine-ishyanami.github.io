package com.reine.client;

import com.reine.client.entity.Book;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.client.HttpGraphQlClient;

import java.util.Optional;

/**
 * @author reine
 * 2024/4/14 下午2:29
 */
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
