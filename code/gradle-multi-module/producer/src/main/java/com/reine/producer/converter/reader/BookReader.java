package com.reine.producer.converter.reader;

import com.reine.entity.Book;
import io.r2dbc.spi.Row;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * @author reine
 */
@ReadingConverter
@Slf4j
public class BookReader implements Converter<Row, Book> {
    @Override
    public Book convert(Row source) {
        log.info("BookReader");
        Book book = new Book();
        Optional.ofNullable(source.get("id", Long.class))
                .ifPresent(book::setId);
        Optional.ofNullable(source.get("title", String.class))
                .ifPresent(book::setTitle);
        Optional.ofNullable(source.get("author_id", Long.class))
                .ifPresent(book::setAuthorId);
        Optional.ofNullable(source.get("publish_time", LocalDateTime.class))
                .ifPresent(book::setPublishTime);
        return book;
    }
}
