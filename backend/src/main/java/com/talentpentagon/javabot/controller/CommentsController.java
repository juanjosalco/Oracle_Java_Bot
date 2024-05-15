package com.talentpentagon.javabot.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;
import com.talentpentagon.javabot.service.EmailSenderService;

@RestController
public class CommentsController {

    @Autowired
    private GetTaskByUserCommandHandler getTaskByUserCommandHandler;

    // Get User's tasks
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("getComments/task/user")
    public ResponseEntity<List<TaskItem>> getTasksForUser(@RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "sortBy", defaultValue = "creationDate") String sortBy,
            @RequestParam(name = "status", defaultValue = "ALL") String status) {

        int assignee = JWTUtil.extractId(token);

        // return taskService.getTasksForUser(assignee, sortBy, status);
        return getTaskByUserCommandHandler.execute(assignee, sortBy, status);
    }
}