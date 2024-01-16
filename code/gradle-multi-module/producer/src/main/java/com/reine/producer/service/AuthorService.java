package com.reine.producer.service;

import com.reine.entity.Author;
import reactor.core.publisher.Flux;

/**
 * @author reine
 */
public interface AuthorService {
    /**
     * 获取所有作者
     *
     * @return
     */
    Flux<Author> getAllAuthor();
}
