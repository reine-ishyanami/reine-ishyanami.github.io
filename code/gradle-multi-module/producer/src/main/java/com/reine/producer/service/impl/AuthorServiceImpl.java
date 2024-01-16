package com.reine.producer.service.impl;

import com.reine.entity.Author;
import com.reine.producer.dao.AuthorRepository;
import com.reine.producer.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

/**
 * @author reine
 */
@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    @Override
    public Flux<Author> getAllAuthor() {
        return authorRepository.findAll();
    }
}
