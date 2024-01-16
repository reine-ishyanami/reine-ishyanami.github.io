package com.reine.producer.controller;

import com.reine.entity.Book;
import com.reine.producer.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author reine
 */
@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/author/{id}")
    public Flux<Book> getBooksByAuthorId(@PathVariable Long id){
        return bookService.getBooksByAuthorId(id);
    }


    @GetMapping("/{id}")
    public Mono<Book> getBookById(@PathVariable Long id){
        return bookService.getBookById(id);
    }
}
