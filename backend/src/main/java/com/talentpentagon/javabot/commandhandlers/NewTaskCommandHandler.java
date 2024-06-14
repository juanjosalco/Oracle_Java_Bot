package com.talentpentagon.javabot.commandhandlers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;

import com.talentpentagon.javabot.Commands.GetByIdCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import io.micrometer.common.util.StringUtils;

@Service
public class NewTaskCommandHandler implements GetByIdCommand<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskService taskService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<TaskItem> execute(TaskItem task) {

        System.out.println("Task: " + task);

        // assignee
        if (task.getAssignee() == 0) {
            throw new RuntimeException("Task assignee cannot be empty");
        }

        // title
        if (StringUtils.isBlank(task.getTaskTitle())) {
            throw new RuntimeException("Task title cannot be empty");
        }
        if (!task.getTaskTitle().matches(specialChars)) {
            throw new RuntimeException("Task title cannot contain special characters");
        }
        if(task.getTaskTitle().getBytes().length > 64) {
            throw new RuntimeException("Task title cannot be more than 64 characters");
        }

        // description
        if (StringUtils.isBlank(task.getDescription())) {
            throw new RuntimeException("Task description cannot be empty");
        }
        if (!task.getDescription().matches(specialChars)) {
            throw new RuntimeException("Task description cannot contain special characters");
        }
        if(task.getDescription().getBytes().length > 320) {
            throw new RuntimeException("Task description cannot be more than 320 characters");
        }

        // TODO: Check the Condition
        // due_date
        if (task.getDueDate() == null) {
            throw new RuntimeException("Task due date cannot be empty");
        }
        // Check if the due date is before now
        Date dueDate = Date.from(task.getDueDate().toInstant());
        Date now = new Date();
        // Check if the due date is before now
        if (dueDate.before(now)) {
            throw new RuntimeException("Task due date cannot be before now");
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
        return ResponseEntity.status(HttpStatus.CREATED).body(task);

    }

}
