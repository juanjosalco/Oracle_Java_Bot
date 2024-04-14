package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.TaskItem;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskItem, Integer>{
    
}
