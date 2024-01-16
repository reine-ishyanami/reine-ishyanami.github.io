package com.reine.http.config;

import com.reine.http.exchange.AuthorExchange;
import com.reine.http.exchange.BookExchange;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

/**
 * @author reine
 */
@Configuration
@ConditionalOnClass({AuthorExchange.class, BookExchange.class})
public class HttpConfiguration {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("http://localhost:8081")
            .build();

    @Bean
    @ConditionalOnMissingBean
    public AuthorExchange authorExchange() {
        return HttpServiceProxyFactory
                .builderFor(WebClientAdapter.create(webClient))
                .build()
                .createClient(AuthorExchange.class);

        // SpringBoot 3.1.6 写法
        // return HttpServiceProxyFactory
        //         .builder(WebClientAdapter.forClient(webClient))
        //         .build()
        //         .createClient(AuthorExchange.class);
    }

    @Bean
    @ConditionalOnMissingBean
    public BookExchange bookExchange() {
        return HttpServiceProxyFactory
                .builderFor(WebClientAdapter.create(webClient))
                .build()
                .createClient(BookExchange.class);

        // SpringBoot 3.1.6 写法
        // return HttpServiceProxyFactory
        //         .builder(WebClientAdapter.forClient(webClient))
        //         .build()
        //         .createClient(BookExchange.class);
    }

}
