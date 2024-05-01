package com.talentpentagon.Commands;

import org.springframework.http.ResponseEntity;

import com.talentpentagon.javabot.model.TaskItem;

public interface GetByIdCommand<E, T> {
    ResponseEntity<TaskItem> execute(E entity);
}
