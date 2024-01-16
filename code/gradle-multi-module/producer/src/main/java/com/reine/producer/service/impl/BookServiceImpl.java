package com.reine.producer.service.impl;

import com.reine.entity.Book;
import com.reine.producer.dao.BookRepository;
import com.reine.producer.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author reine
 */
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Flux<Book> getBooksByAuthorId(Long id) {
        return bookRepository.findAllByAuthorId(id);
    }

    @Override
    public Mono<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
}
