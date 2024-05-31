package com.talentpentagon.javabot.queryhandlers;

import org.springframework.http.ResponseEntity;

public interface Query<O> {
    ResponseEntity<O> execute();
}
