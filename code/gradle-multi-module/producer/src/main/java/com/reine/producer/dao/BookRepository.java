package com.reine.producer.dao;

import com.reine.entity.Book;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * @author reine
 */
@Repository
public interface BookRepository extends R2dbcRepository<Book, Long> {
    Flux<Book> findAllByAuthorId(Long authorId);
}
