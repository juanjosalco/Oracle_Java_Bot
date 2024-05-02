package com.talentpentagon.javabot.commandhandlers;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Commands.PostPutCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import io.micrometer.common.util.StringUtils;

@Service
public class EditTaskCommandHandler implements PostPutCommand<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskService taskService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<TaskItem> execute(TaskItem task) {
        // title
        if (StringUtils.isBlank(task.getTaskTitle())) {
            throw new RuntimeException("Task title cannot be empty");
        }
        if (!task.getTaskTitle().matches(specialChars)) {
            throw new RuntimeException("Task title cannot contain special characters");
        }

        // description
        if (StringUtils.isBlank(task.getDescription())) {
            throw new RuntimeException("Task description cannot be empty");
        }
        if (!task.getDescription().matches(specialChars)) {
            throw new RuntimeException("Task description cannot contain special characters");
        }

        // creation_date
        if (task.getCreationDate() == null) {
            throw new RuntimeException("Task creation date cannot be empty");
        }

        // due_date
        if (task.getDueDate() == null) {
            throw new RuntimeException("Task due date cannot be empty");
        }

        // priotity
        if (task.getPriority() == null) {
            throw new RuntimeException("Task priority cannot be empty");
        }
        if (task.getPriority() < 1 || task.getPriority() > 3) {
            throw new RuntimeException("Task priority must be between 1 and 3");
        }

        taskService.updateTask(task.getId(), task);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(task);

    }

}
