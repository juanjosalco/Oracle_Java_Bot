package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;

import com.talentpentagon.javabot.Commands.PostPutCommand;
// import com.talentpentagon.javabot.Commands.GetByIdCommand;
import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.service.CommentService;
import io.micrometer.common.util.StringUtils;

@Service
public class NewCommentCommandHandler implements PostPutCommand<Comment, ResponseEntity<Comment>> {

    @Autowired
    private CommentService commentService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<Comment> execute(Comment comment) {

        System.out.println("Task: " + comment);

        // Commenter Id
        if (comment.getCommenterId() == 0) {
            throw new RuntimeException("Commenter Id cannot be empty");
        }

        // Message
        if (StringUtils.isBlank(comment.getMessage())) {
            throw new RuntimeException("Comment cannot be empty");
        }
        if (!comment.getMessage().matches(specialChars)) {
            throw new RuntimeException("Comment cannot contain special characters");
        }

        // creation date
        if (comment.getCreationDate() == null) {
            throw new RuntimeException("Comment due date cannot be empty");
        }

        commentService.createComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);

    }

}
