package com.talentpentagon.javabot.Commands;

import org.springframework.http.ResponseEntity;

public interface PostPutCommand<E, T> {

    ResponseEntity<E> execute(E entity);

    // ResponseEntity<Comment> execute(Comment comment);

}