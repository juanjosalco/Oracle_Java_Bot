package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.TaskItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskItem, Integer> {

    Optional<TaskItem> findById(Integer id);
    List<TaskItem> findByAssignee(Integer assignee, Sort sortBy);

    List<TaskItem> findByAssigneeAndStatus(Integer assignee, String status, Sort sortBy);
    List<TaskItem> findByAssigneeAndPriority(Integer assignee, Integer priority, Sort sortBy);
    List<TaskItem> findByAssigneeAndStatusAndPriority(Integer assignee, String status, Integer priority, Sort sortBy);
}
