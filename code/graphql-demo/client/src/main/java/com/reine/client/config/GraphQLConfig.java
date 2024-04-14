package com.reine.client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.GraphQlRequest;
import org.springframework.graphql.GraphQlResponse;
import org.springframework.graphql.client.GraphQlClient;
import org.springframework.graphql.client.GraphQlTransport;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;

/**
 * @author reine
 * 2024/4/14 下午2:26
 */
@Configuration
public class GraphQLConfig {

    @Bean
    public HttpGraphQlClient client() {
        WebClient webClient = WebClient.create("http://localhost:8080/graphql");
        return HttpGraphQlClient.create(webClient);
    }
}
