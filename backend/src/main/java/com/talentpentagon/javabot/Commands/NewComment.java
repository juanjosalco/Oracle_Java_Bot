package com.talentpentagon.javabot.Commands;

import org.springframework.http.ResponseEntity;

import com.talentpentagon.javabot.model.Comment;

public interface NewComment<E, T> {
    ResponseEntity<Comment> execute(E entity);
}
