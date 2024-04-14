package com.reine.server.entity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public record Book(String id, String name, int pageCount, String authorId) {

    private static int autoIncrementId = 3;

    private static List<Book> books = new ArrayList<>();

    static {
        books.add(new Book("book-1", "Effective Java", 416, "author-1"));
        books.add(new Book("book-2", "Hitchhiker's Guide to the Galaxy", 208, "author-2"));
        books.add(new Book("book-3", "Down Under", 436, "author-3"));
    }

    /**
     * Get book by id.
     *
     * @param id id
     * @return book
     */
    public static Book getById(String id) {
        return books.stream()
                .filter(book -> book.id().equals(id))
                .findFirst()
                .orElse(null);
    }

    /**
     * add book.
     *
     * @param name      name
     * @param pageCount pageCount
     * @param authorId  authorId
     * @return book
     */
    public static Book create(String name, int pageCount, String authorId) {
        Book book = new Book(String.format("book-%d", autoIncrementId++), name, pageCount, authorId);
        books.add(book);
        return book;
    }


    /**
     * update book by id.
     *
     * @param id        id
     * @param name      name
     * @param pageCount pageCount
     * @param authorId  authorId
     * @return book
     */
    public static Book update(String id, String name, int pageCount, String authorId) {
        Iterator<Book> iterator = books.iterator();
        Book newBook = null;
        while (iterator.hasNext()) {
            Book book = iterator.next();
            if (book.id().equals(id)) {
                iterator.remove();
                newBook = new Book(id, name, pageCount, authorId);
                books.add(newBook);
                break;
            }
        }
        if (newBook == null) throw new RuntimeException("book has not exists");
        return newBook;
    }

    /**
     * delete book by id.
     *
     * @param id id
     * @return book
     */
    public static Book delete(String id) {
        Iterator<Book> iterator = books.iterator();
        Book removeBook = null;
        while (iterator.hasNext()) {
            Book book = iterator.next();
            if (book.id().equals(id)) {
                iterator.remove();
                removeBook = book;
                break;
            }
        }
        return removeBook;
    }
}