package com.talentpentagon.javabot.Querys;

import org.springframework.http.ResponseEntity;

public interface Query<O> {
    ResponseEntity<O> execute();
}
