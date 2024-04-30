package com.talentpentagon.Commands;

import org.springframework.http.ResponseEntity;

public interface GetCommand<E, T> {

    ResponseEntity<T> execute(E entity, String sortBy, String status);

}
