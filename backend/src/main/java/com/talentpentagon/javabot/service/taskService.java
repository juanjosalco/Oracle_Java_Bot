package com.talentpentagon.javabot.service;

import java.util.List;
import java.util.Optional;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    public List<TaskItem> getTasks(){
        return taskRepository.findAll();
    }

    public ResponseEntity<TaskItem> getTaskById(int id){
        Optional<TaskItem> task = taskRepository.findById(id);

        if(task.isPresent()){
            return new ResponseEntity<TaskItem>(task.get(), HttpStatus.OK);
        } 
        else{
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        } 
    }
    
    public ResponseEntity<List<TaskItem>> getTasksForUser(Integer assignee) {
        List<TaskItem> tasks = taskRepository.findByAssignee(assignee);
        if (tasks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }
    }

    public ResponseEntity<TaskItem> addTask(TaskItem task){
        TaskItem newTask = taskRepository.save(task);
        return new ResponseEntity<TaskItem>(newTask, HttpStatus.CREATED);
    }

    public ResponseEntity<TaskItem> updateTask(int id, TaskItem task){
        Optional<TaskItem> taskOptional = taskRepository.findById(id);

        if(taskOptional.isPresent()){
            TaskItem updatedTask = taskRepository.save(task);
            updatedTask.setId(id);
            updatedTask.setCreationDate(task.getCreationDate());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setStatus(task.getStatus());
            return new ResponseEntity<TaskItem>(updatedTask, HttpStatus.OK);
        } 
        else{
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        } 
    }

    public ResponseEntity<TaskItem> updateTaskStatus(int id, String status){
        Optional<TaskItem> task = taskRepository.findById(id);

        if(task.isPresent()){
            task.get().setStatus(status);
            taskRepository.save(task.get());
            return new ResponseEntity<TaskItem>(HttpStatus.OK);
        } 
        else{
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        } 
    }

    
}
