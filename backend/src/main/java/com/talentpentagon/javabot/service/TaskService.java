package com.talentpentagon.javabot.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Get all task data
    public List<TaskItem> getTasks() {
        return taskRepository.findAll();
    }

    // Get individual task data by id
    public ResponseEntity<TaskItem> getTaskById(int id) {
        Optional<TaskItem> task = taskRepository.findById(id);

        if (task.isPresent()) {
            return new ResponseEntity<TaskItem>(task.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        }
    }

    // Returns the tasks assigned to an user
    public ResponseEntity<List<TaskItem>> getTasksForUser(Integer assignee, String sortBy, String status, Integer priority) {
        
        // Return a Bad Request if the assignee is null
        if (assignee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        
        // Sorter "attributes" to give our sort object
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortBy.startsWith("-")) {
            direction = Sort.Direction.DESC;
            sortBy = sortBy.substring(1);
        }
        else direction = Sort.Direction.ASC;

        // Assign the parameters to the sort object
        Sort sort = Sort.by(direction, sortBy);

        // Get the tasks assigned to the user. Here we'll get all tasks assigned to the user depending on the filters.
        List<TaskItem> tasks = null;
        if(status.equals("ALL") && priority == 0){
            tasks = taskRepository.findByAssignee(assignee, sort); System.out.println("Only assignee");
        } 
        else if(status.equals("ALL") && !(priority == 0)){
            tasks = taskRepository.findByAssigneeAndPriority(assignee, priority, sort); System.out.println("Assignee and priority");
        } 
        else if(!status.equals("ALL") && priority == 0){
            tasks = taskRepository.findByAssigneeAndStatus(assignee, status, sort); System.out.println("Assignee and status");
        } 
        else if(!status.equals("ALL") && !(priority == 0)){
            tasks = taskRepository.findByAssigneeAndStatusAndPriority(assignee, status, priority, sort); System.out.println("Assignee, status and priority");
        } 

        // Check if tasks were found for the user
        if(tasks != null){
            if (tasks.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tasks);
        }

        if(tasks != null){
            // Filter the tasks based on the status and priority
            tasks.removeIf(task -> task.getStatus().equals("Cancelled"));
        }

        if (status.equals("ALL")) return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.OK);
        else return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.OK);
    }

    // Add a new task
    public ResponseEntity<TaskItem> addTask(TaskItem task) {
        TaskItem newTask = taskRepository.save(task);
        return new ResponseEntity<TaskItem>(newTask, HttpStatus.CREATED);
    }

    // Update a task
    public ResponseEntity<TaskItem> updateTask(int id, TaskItem task) {
        Optional<TaskItem> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            TaskItem updatedTask = taskRepository.save(task);
            updatedTask.setId(id);
            updatedTask.setCreationDate(task.getCreationDate());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setStatus(task.getStatus());
            return new ResponseEntity<TaskItem>(updatedTask, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        }
    }

    // Update task status
    public ResponseEntity<TaskItem> updateTaskStatus(int id, String status, OffsetDateTime taskCreationDate) {
        Optional<TaskItem> task = taskRepository.findById(id);

        if (task.isPresent()) {
            task.get().setStatus(status);
            task.get().setStatusChangeDate(OffsetDateTime.now().plusDays(0));
            taskRepository.save(task.get());
            return new ResponseEntity<TaskItem>(HttpStatus.NO_CONTENT);
        } 
        
        else return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        
    }

    // Sort and filter data
    public ResponseEntity<List<TaskItem>> sortAndFilter(List<TaskItem> tasks, String sortBy, String status, Integer priority) {

        // Sort
        if (sortBy.equals("dueDate")) {
            tasks.sort((t1, t2) -> t1.getDueDate().compareTo(t2.getDueDate()));
        } else if (sortBy.equals("priority")) {
            tasks.sort((t1, t2) -> t1.getPriority().compareTo(t2.getPriority()));
        } else if (sortBy.equals("creationDate")) {
            tasks.sort((t1, t2) -> t1.getCreationDate().compareTo(t2.getCreationDate()));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Filter
        if (!status.equals("ALL")) tasks.removeIf(task -> !task.getStatus().equals(status));
        if (!(priority == 0)) tasks.removeIf(task -> !task.getPriority().equals(priority));
        
        return ResponseEntity.ok(tasks);
    }

}
