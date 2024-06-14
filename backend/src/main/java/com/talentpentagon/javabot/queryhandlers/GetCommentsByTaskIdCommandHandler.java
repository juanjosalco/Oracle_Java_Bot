package com.talentpentagon.javabot.queryhandlers;

import com.talentpentagon.javabot.Querys.GetCommentsByTaskIdCommand;
import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.service.CommentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GetCommentsByTaskIdCommandHandler implements GetCommentsByTaskIdCommand<Integer, List<Comment>> {

    @Autowired
    private CommentService commentService;

    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }

    @Override
    public ResponseEntity<List<Comment>> execute(Integer id) {

        // Check if ID is null
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Invoke the service method to retrieve comments list from a task by Id
        List<Comment> comments = commentService.getCommentsByTaskId(id).getBody();

        return ResponseEntity.status(HttpStatus.OK).body(comments);
    }
}
