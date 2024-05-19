package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewCommentCommandHandler;
import com.talentpentagon.javabot.queryhandlers.GetCommentsByTaskIdCommandHandler;
import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;
    private NewCommentCommandHandler newCommentCommandHandler;
    private GetCommentsByTaskIdCommandHandler getCommentByTaskIdCommandHandler;

    // GET
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @GetMapping("/comments/{taskId}")
    public ResponseEntity<List<Comment>> getCommentsByTaskId(@PathVariable int taskId) {
        // return commentService.getCommentsByTaskId(taskId);
        return getCommentByTaskIdCommandHandler.execute(taskId);
    }

    // POST
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        // return commentService.createComment(comment);
        return newCommentCommandHandler.execute(comment);
    }
}
