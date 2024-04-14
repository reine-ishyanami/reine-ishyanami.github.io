package com.reine.client.entity;

/**
 * @author reine
 * 2024/4/14 下午2:36
 */
public record Book(String id, String name, int pageCount, Author author) {

    public record Author(String id, String firstName, String lastName){}
}
