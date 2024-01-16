package com.reine.producer.dao;

import com.reine.entity.Author;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

/**
 * @author reine
 */
@Repository
public interface AuthorRepository extends R2dbcRepository<Author, Long> {
}
