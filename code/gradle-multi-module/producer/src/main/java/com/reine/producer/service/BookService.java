package com.reine.producer.service;

import com.reine.entity.Book;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author reine
 */
public interface BookService {
    /**
     * 根据作者id查询所有书籍
     *
     * @param id
     * @return
     */
    Flux<Book> getBooksByAuthorId(Long id);

    /**
     * 通过id获取书籍
     *
     * @param id
     * @return
     */
    Mono<Book> getBookById(Long id);
}
