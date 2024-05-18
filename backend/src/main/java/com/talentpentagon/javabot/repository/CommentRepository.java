package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByTaskId(int taskID);
}