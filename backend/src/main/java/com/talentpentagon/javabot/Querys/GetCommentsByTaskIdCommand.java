package com.talentpentagon.javabot.Querys;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.talentpentagon.javabot.model.Comment;

public interface GetCommentsByTaskIdCommand<E, T> {
    ResponseEntity<List<Comment>> execute(E entity);
}
