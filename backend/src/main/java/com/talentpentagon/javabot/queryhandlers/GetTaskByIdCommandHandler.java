package com.talentpentagon.javabot.queryhandlers;

import com.talentpentagon.javabot.Querys.GetByIdCommand;
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
        // Check if tasks were found
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        TaskItem task = taskService.getTaskById(id).getBody();
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        taskService.getTaskById(id);
        return ResponseEntity.status(HttpStatus.OK).body(task);
    }
}
