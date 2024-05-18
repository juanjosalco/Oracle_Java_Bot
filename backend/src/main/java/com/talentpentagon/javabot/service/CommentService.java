package com.talentpentagon.javabot.service;

import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.repository.CommentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // Get
    public ResponseEntity<List<Comment>> getCommentsByTaskId(int taskId) {
        List<Comment> comments = commentRepository.findByTaskId(taskId);
        return new ResponseEntity<List<Comment>>(comments, HttpStatus.OK);
    }

    // Post
    public ResponseEntity<Comment> createComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);
        return new ResponseEntity<Comment>(savedComment, HttpStatus.CREATED);
    }
}
