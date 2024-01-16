package com.reine.producer.converter.writer;

import com.reine.entity.Author;
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
public class AuthorWriter implements Converter<Author, OutboundRow> {
    @Override
    public OutboundRow convert(Author source) {
        log.info("AuthorWriter");
        OutboundRow row = new OutboundRow();
        Optional.ofNullable(source.getId())
                .ifPresent(id -> row.put("id", Parameter.from(id)));
        Optional.ofNullable(source.getName())
                .ifPresent(name -> row.put("name", Parameter.from(name)));
        return row;
    }
}
