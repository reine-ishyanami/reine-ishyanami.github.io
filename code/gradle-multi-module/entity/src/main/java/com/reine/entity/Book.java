package com.reine.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

/**
 * @author reine
 */
@Data
@Table("t_book")
public class Book {

    @Id
    private Long id;

    private String title;

    private Long authorId;

    private LocalDateTime publishTime;
}
