package com.talentpentagon.javabot.commandhandlers;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Commands.PostCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TaskRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class EditTaskStatusCommandHandler implements PostCommand<TaskItem, ResponseEntity<TaskItem>> {

    @Autowired
    private TaskRepository taskRepository;

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
        if ((!task.getStatus().matches("^(?i) *(ToDo|Ongoing|Done|Cancelled)$"))) {
            throw new RuntimeException("Task status must be one of 'ToDo', 'Ongoing', 'Done', 'Cancelled'");
        }
        
        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.OK).body(task);

    }

}
