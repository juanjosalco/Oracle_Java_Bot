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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!task.getTaskTitle().matches(specialChars)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // description
        if (StringUtils.isBlank(task.getDescription())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!task.getDescription().matches(specialChars)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // creation_date
        if (task.getCreationDate() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // due_date
        if (task.getDueDate() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // priotity
        if (task.getPriority() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (task.getPriority() < 1 || task.getPriority() > 3) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        taskService.updateTask(task.getId(), task);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(task);

    }

}
