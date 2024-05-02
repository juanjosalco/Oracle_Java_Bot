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
public class EditTaskStatusCommandHandler implements PostPutCommand<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskService taskService;

    @Override
    public ResponseEntity<TaskItem> execute(TaskItem task) {
        // status_change_date
        if (task.getStatusChangeDate() == null) {
            throw new RuntimeException("Task status change date cannot be empty");
        }
        // status
        if (StringUtils.isBlank(task.getStatus())) {
            throw new RuntimeException("Task status cannot be empty");
        }
        if ((!task.getStatus().matches("^(?i) *(To do|Ongoing|Done|Cancelled)$"))) {
            throw new RuntimeException("Task status must be one of 'To do', 'Ongoing', 'Done', 'Cancelled'");
        }

        // status_change_date
        if (task.getStatusChangeDate() == null) {
            throw new RuntimeException("Task status change date cannot be empty");
        }

        taskService.updateTaskStatus(task.getId(), task.getStatus(), task.getStatusChangeDate());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(task);

    }

}
