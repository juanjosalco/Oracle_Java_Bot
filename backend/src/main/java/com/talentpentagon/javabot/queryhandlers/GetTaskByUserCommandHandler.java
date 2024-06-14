package com.talentpentagon.javabot.queryhandlers;

import com.talentpentagon.javabot.Querys.GetCommand;
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

    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Override
    public ResponseEntity<List<TaskItem>> execute(Integer userId, String sortBy, String status, Integer priority) {

        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Invoke the service method to retrieve tasks assigned to the user
        List<TaskItem> tasks = taskService.getTasksForUser(userId, sortBy, status, priority).getBody();

        // taskService.addTask((TaskItem) tasks);
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }
}