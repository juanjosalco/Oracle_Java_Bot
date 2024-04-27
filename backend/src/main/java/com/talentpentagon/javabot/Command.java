package com.talentpentagon.javabot;

import org.springframework.http.ResponseEntity;

import com.talentpentagon.javabot.model.TaskItem;

public interface Command<E, T> {
    ResponseEntity<TaskItem> execute(E entity);
}
