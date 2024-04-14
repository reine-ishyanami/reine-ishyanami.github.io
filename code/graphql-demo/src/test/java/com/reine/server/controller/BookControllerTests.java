package com.reine.server.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.graphql.test.tester.GraphQlTester;

/**
 * @author reine
 * 2024/4/14 下午1:42
 */
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
