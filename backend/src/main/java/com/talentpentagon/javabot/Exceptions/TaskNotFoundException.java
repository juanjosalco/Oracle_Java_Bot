package com.talentpentagon.javabot.Exceptions;

import org.springframework.http.HttpStatus;

public class TaskNotFoundException extends CustomBaseException {

    public TaskNotFoundException() {
        super(HttpStatus.BAD_REQUEST, new SimpleResponse("Task not found"));

    }

}
