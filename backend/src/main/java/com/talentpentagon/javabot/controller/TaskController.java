package com.talentpentagon.javabot.controller;

import java.util.List;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class TaskController {

        // Hardcoded status: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        // Just an empty list: return ResponseEntity.ok(Collections.emptyList());

    @Autowired
    private TaskService taskService;

    @GetMapping("task")
    public ResponseEntity<List<TaskItem>> getTasks(){
        List<TaskItem> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);

    }

    @GetMapping("task/user/{assignee}")
    public ResponseEntity<List<TaskItem>> getTasksForUser(@PathVariable("assignee") int assignee) {
        return taskService.getTasksForUser(assignee);
    }

    @GetMapping("task/{id}")
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

    @PostMapping("task")
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

    // Whole edit
    @PutMapping("task/{id}")
    public ResponseEntity<TaskItem> putTask(@PathVariable int id, @RequestBody TaskItem task) {
        try{
            ResponseEntity<TaskItem> updatedTask = taskService.updateTask(id, task);
            return new ResponseEntity<TaskItem>(updatedTask.getBody(), updatedTask.getStatusCode());
        } 
        catch (Exception e){
            System.out.println("ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    }

    // Use this only to change the status
    @PutMapping("task/{id}/status")
    public ResponseEntity<TaskItem> putTaskStatus(@PathVariable int id, @RequestBody TaskItem task) {
        try{
            ResponseEntity<TaskItem> updatedTask = taskService.updateTaskStatus(id, task.getStatus());
            return new ResponseEntity<TaskItem>(updatedTask.getBody(), updatedTask.getStatusCode());
        } 
        catch (Exception e){
            System.out.println("ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }        
    }

}
