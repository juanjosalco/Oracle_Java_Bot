package com.talentpentagon.javabot.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



@RestController

public class TaskController{
    
    @GetMapping(value = "/task")
    public ResponseEntity getTask() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    }
}
