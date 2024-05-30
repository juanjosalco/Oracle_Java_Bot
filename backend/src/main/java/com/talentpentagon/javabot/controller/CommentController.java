package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewCommentCommandHandler;
import com.talentpentagon.javabot.queryhandlers.GetCommentsByTaskIdCommandHandler;
import com.talentpentagon.javabot.model.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

    @Autowired
    private NewCommentCommandHandler newCommentCommandHandler;

    @Autowired
    private GetCommentsByTaskIdCommandHandler getCommentByTaskIdCommandHandler;

    // GET
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer') || hasRole('Manager')")
    @GetMapping("/comments/{taskId}")
    public ResponseEntity<List<Comment>> getCommentsByTaskId(@PathVariable int taskId) {
        return getCommentByTaskIdCommandHandler.execute(taskId);
    }

    // POST
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer') || hasRole('Manager')")
    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        return newCommentCommandHandler.execute(comment);
    }
}
