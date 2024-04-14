package com.reine.server.controller;

import com.reine.server.entity.Author;
import com.reine.server.entity.Book;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookController {

    @SchemaMapping
    public Author author(Book book) {
        return Author.getById(book.authorId());
    }

    @QueryMapping
    public Book bookById(@Argument String id) {
        return Book.getById(id);
    }

    @QueryMapping
    public String hello() {
        return "Hello GraphQL";
    }

    @MutationMapping
    public Book createBook(@Argument String name,
                           @Argument int pageCount,
                           @Argument String authorId) {
        return Book.create(name, pageCount, authorId);
    }

    @MutationMapping
    public Book updateBook(@Argument String id,
                           @Argument String name,
                           @Argument int pageCount,
                           @Argument String authorId) {
        return Book.update(id, name, pageCount, authorId);
    }

    @MutationMapping
    public Book deleteBook(@Argument String id) {
        return Book.delete(id);
    }

}