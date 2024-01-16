package com.reine.producer.converter.writer;

import com.reine.entity.Book;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.r2dbc.mapping.OutboundRow;
import org.springframework.r2dbc.core.Parameter;

import java.util.Optional;

/**
 * @author reine
 */
@WritingConverter
@Slf4j
public class BookWriter implements Converter<Book, OutboundRow> {
    @Override
    public OutboundRow convert(Book source) {
        log.info("BookWriter");
        OutboundRow row = new OutboundRow();
        Optional.ofNullable(source.getId())
                .ifPresent(id -> row.put("id", Parameter.from(id)));
        Optional.ofNullable(source.getTitle())
                .ifPresent(title -> row.put("title", Parameter.from(title)));
        Optional.ofNullable(source.getAuthorId())
                .ifPresent(authorId -> row.put("author_id", Parameter.from(authorId)));
        Optional.ofNullable(source.getPublishTime())
                .ifPresent(publishTime -> row.put("publish_time", Parameter.from(publishTime)));
        return row;
    }
}
