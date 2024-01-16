package com.reine.producer.converter.reader;

import com.reine.entity.Author;
import io.r2dbc.spi.Row;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.util.Optional;

/**
 * @author reine
 */
@ReadingConverter
@Slf4j
public class AuthorReader implements Converter<Row, Author> {
    @Override
    public Author convert(Row source) {
        log.info("AuthorReader");
        Author author = new Author();
        Optional.ofNullable(source.get("id", Long.class))
                .ifPresent(author::setId);
        Optional.ofNullable(source.get("name", String.class))
                .ifPresent(author::setName);
        return author;
    }
}
