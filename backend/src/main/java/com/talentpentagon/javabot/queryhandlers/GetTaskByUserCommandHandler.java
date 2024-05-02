package com.talentpentagon.javabot.queryhandlers;

import com.talentpentagon.javabot.Commands.GetCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTaskByUserCommandHandler implements GetCommand<Integer, List<TaskItem>> {

    @Autowired
    private TaskService taskService;

    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Override
    public ResponseEntity<List<TaskItem>> execute(Integer userId, String sortBy, String status) {

        if (userId == null) {
            throw new RuntimeException("User ID cannot be null");
        }

        // Invoke the service method to retrieve tasks assigned to the user
        List<TaskItem> tasks = taskService.getTasksForUser(userId, sortBy, status).getBody();

        // Check if tasks were found for the user
        if (tasks.isEmpty()) {
            throw new RuntimeException("No tasks found for the user");
        }

        // taskService.addTask((TaskItem) tasks);
        taskService.getTasksForUser(userId, sortBy, status);
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }
}