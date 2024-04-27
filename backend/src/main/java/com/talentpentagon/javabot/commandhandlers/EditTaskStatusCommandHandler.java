package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Command;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TaskRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class EditTaskStatusCommandHandler implements Command<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public ResponseEntity<TaskItem> execute(TaskItem task) {
        // status_change_date
        if (task.getStatusChangeDate() == null) {
            throw new RuntimeException("Task status change date cannot be empty");
        }
        if (task.getStatusChangeDate().isBefore(task.getCreationDate())) {
            throw new RuntimeException("Task status change date cannot be before creation date");
        }

        // status
        if (StringUtils.isBlank(task.getStatus())) {
            throw new RuntimeException("Task status cannot be empty");
        }
        if ((!task.getStatus().matches("^(?i) *(ToDo|Ongoing|Done|Cancelled)$"))) {
            throw new RuntimeException("Task status must be one of 'ToDo', 'Ongoing', 'Done', 'Cancelled'");
        }

        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.OK).body(task);

        // try {
        // ResponseEntity<TaskItem> updatedTask = taskService.updateTaskStatus(id,
        // task.getStatus());
        // return new ResponseEntity<TaskItem>(updatedTask.getBody(),
        // updatedTask.getStatusCode());
        // } catch (Exception e) {
        // System.out.println("ERROR: " + e.getMessage());
        // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        // }
    }

}
