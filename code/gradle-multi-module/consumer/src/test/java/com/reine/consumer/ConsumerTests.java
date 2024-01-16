package com.reine.consumer;

import com.reine.http.exchange.AuthorExchange;
import com.reine.http.exchange.BookExchange;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author reine
 */
@SpringBootTest
public class ConsumerTests {

    @Autowired
    AuthorExchange authorExchange;

    @Test
    void get_all_author_test() {
        authorExchange.getAllAuthor()
                .toStream()
                .forEach(System.out::println);
    }

    @Autowired
    BookExchange bookExchange;

    @Test
    void get_book_by_author_id_test() {
        bookExchange.getBooksByAuthorId(5L)
                .toStream()
                .forEach(System.out::println);
    }

    @Test
    void get_book_by_id_test() {
        System.out.println(bookExchange.getBookById(10L).block());
    }
}
