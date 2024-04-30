package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;

import com.talentpentagon.Commands.GetByIdCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import io.micrometer.common.util.StringUtils;

@Service
public class NewTaskCommandHandler implements GetByIdCommand<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskService taskService;

    @Override
    public ResponseEntity<TaskItem> execute(TaskItem task) {

        // id
        if (task.getId() != null) {
            throw new RuntimeException("Task id cant be empty");
        }

        // assignee
        if (task.getAssignee() == 0) {
            throw new RuntimeException("Task assignee cannot be empty");
        }

        // name
        if (StringUtils.isBlank(task.getName())) {
            throw new RuntimeException("Task name cannot be empty");
        }
        if (task.getName().matches(".*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new RuntimeException("Task name cannot contain special characters");
        }

        // description
        if (StringUtils.isBlank(task.getDescription())) {
            throw new RuntimeException("Task description cannot be empty");
        }
        if (task.getDescription().matches(".*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
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
        if (task.getDueDate().isBefore(task.getCreationDate())) {
            throw new RuntimeException("Task due date cannot be before creation date");
        }

        // priority
        if (task.getPriority() == null) {
            throw new RuntimeException("Task priority cannot be empty");
        }
        if (task.getPriority() < 1 || task.getPriority() > 3) {
            throw new RuntimeException("Task priority must be between 1 and 3");
        }

        // status
        if (StringUtils.isBlank(task.getStatus())) {
            throw new RuntimeException("Task status cannot be empty");
        }
        if ((!task.getStatus().matches("^(?i) *(ToDo|Ongoing|Done|Cancelled)$"))) {
            throw new RuntimeException("Task status must be one of 'ToDo', 'Ongoing', 'Done', 'Cancelled'");
        }

        taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(task);

    }

}
