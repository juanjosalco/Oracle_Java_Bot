package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByTaskId(int taskID);
}