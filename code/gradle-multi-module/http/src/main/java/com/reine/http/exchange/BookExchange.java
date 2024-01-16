package com.reine.http.exchange;

import com.reine.entity.Book;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author reine
 */
@HttpExchange("/book")
public interface BookExchange {

    @GetExchange("/author/{id}")
    Flux<Book> getBooksByAuthorId(@PathVariable Long id);

    @GetExchange("/{id}")
    Mono<Book> getBookById(@PathVariable Long id);
}
