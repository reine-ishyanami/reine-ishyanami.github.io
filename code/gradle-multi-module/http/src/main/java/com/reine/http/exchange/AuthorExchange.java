package com.reine.http.exchange;

import com.reine.entity.Author;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import reactor.core.publisher.Flux;

/**
 * @author reine
 */
@HttpExchange("/author")
public interface AuthorExchange {

    @GetExchange("/all")
    Flux<Author> getAllAuthor();
}
