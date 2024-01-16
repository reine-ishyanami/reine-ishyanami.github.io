package com.reine.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * @author reine
 */
@Data
@Table("t_author")
public class Author {

    @Id
    private Long id;

    private String name;
}

