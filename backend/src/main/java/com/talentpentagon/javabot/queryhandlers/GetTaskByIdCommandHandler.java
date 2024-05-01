package com.talentpentagon.javabot.queryhandlers;

import com.talentpentagon.javabot.Commands.GetByIdCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GetTaskByIdCommandHandler implements GetByIdCommand<Integer, ResponseEntity<List<TaskItem>>> {

    @Autowired
    private TaskService taskService;

    @Override
    public ResponseEntity<TaskItem> execute(Integer id) {
        TaskItem task = taskService.getTaskById(id).getBody();
        // Check if tasks were found
        if (id == null) {
            throw new RuntimeException("User ID cannot be null");
        }
        if (task == null) {
            throw new RuntimeException("No tasks found for the provided Id");
        }

        // taskService.addTask(task);
        taskService.getTaskById(id);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }
}
