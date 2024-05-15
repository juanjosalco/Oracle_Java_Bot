package com.talentpentagon.javabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

public class CommentsService {

    @Autowired
    private TaskRepository taskRepository;

    // Extracts user from the JWT token and returns the tasks assigned to that user
    public ResponseEntity<List<TaskItem>> getTasksForUser(Integer assignee, String sortBy, String status) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortBy.startsWith("-")) {
            direction = Sort.Direction.DESC;
            sortBy = sortBy.substring(1);
        }

        Sort sort = Sort.by(direction, sortBy);
        List<TaskItem> tasks = taskRepository.findByAssignee(assignee, sort);

        if (tasks.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tasks);
        tasks.removeIf(task -> task.getStatus().equals("Cancelled"));

        if (status.equals("ALL")) {
            return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.OK);
        } else {
            return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.OK);
        }
    }
}
