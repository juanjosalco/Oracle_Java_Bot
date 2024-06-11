package com.talentpentagon.javabot.Exceptions;

import org.springframework.http.HttpStatus;

public class TaskNotValidException extends CustomBaseException {

    public TaskNotValidException(String message) {
        super(HttpStatus.BAD_REQUEST, new SimpleResponse(message));
    }

}
