package com.talentpentagon.javabot.Exceptions;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class CustomBaseException extends RuntimeException {
    private HttpStatus status;
    private SimpleResponse simpleResponse;

    public CustomBaseException(HttpStatus status, SimpleResponse simpleResponse) {
        this.status = status;
        this.simpleResponse = simpleResponse;
    }

}
