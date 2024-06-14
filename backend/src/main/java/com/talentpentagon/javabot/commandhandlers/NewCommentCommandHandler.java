package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;

import com.talentpentagon.javabot.Commands.NewComment;
import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.service.CommentService;
import io.micrometer.common.util.StringUtils;

@Service
public class NewCommentCommandHandler implements NewComment<Comment, ResponseEntity<Comment>> {

    @Autowired
    private CommentService commentService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<Comment> execute(Comment comment) {

        System.out.println("Comment: " + comment);

        // Commenter Id
        if (comment.getCommenterId() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Message
        if (StringUtils.isBlank(comment.getMessage())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!comment.getMessage().matches(specialChars)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // creation date
        if (comment.getCreationDate() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        commentService.createComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);

    }

}
