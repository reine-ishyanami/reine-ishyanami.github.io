package com.reine.server.entity;

import java.util.ArrayList;
import java.util.List;

public record Author(String id, String firstName, String lastName) {

    private static List<Author> authors = new ArrayList<>();

    static {
        authors.add(new Author("author-1", "Joshua", "Bloch"));
        authors.add(new Author("author-2", "Douglas", "Adams"));
        authors.add(new Author("author-3", "Bill", "Bryson"));
    }

    /**
     * Get author by id.
     *
     * @param id id
     * @return author
     */
    public static Author getById(String id) {
        return authors.stream()
                .filter(author -> author.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}