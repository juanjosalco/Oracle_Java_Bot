package com.talentpentagon.javabot.Commands;

import org.springframework.http.ResponseEntity;

public interface UnblockCommand<E> {

    ResponseEntity<?> execute(Integer id);
    // ResponseEntity<Comment> execute(Comment comment);

}