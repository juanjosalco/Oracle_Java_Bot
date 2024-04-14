package com.talentpentagon.javabot.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentpentagon.javabot.repository.TaskRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/task")
public class TaskController {

        // Hardcoded status: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        // Just an empty list: return ResponseEntity.ok(Collections.emptyList());

    @Autowired
    private TaskService taskService;

    @GetMapping()
    public ResponseEntity<List<TaskItem>> getTasks(){
        List<TaskItem> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);

    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskItem> getTaskById(@PathVariable("id") int id) {
        try{
            ResponseEntity<TaskItem> task = taskService.getTaskById(id);
            return new ResponseEntity<TaskItem>(task.getBody(), task.getStatusCode());
        } 
        catch (Exception e){
            System.out.println("ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    }

    @PostMapping("")
    public ResponseEntity<TaskItem> postTask(@RequestBody TaskItem task) {
        try{
            ResponseEntity<TaskItem> newTask = taskService.addTask(task);
            return new ResponseEntity<TaskItem>(newTask.getBody(), newTask.getStatusCode());
        } 
        catch (Exception e){
            System.out.println("ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    }

}
