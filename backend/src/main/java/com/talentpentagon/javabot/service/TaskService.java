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

    // Extracts user from the JWT token and returns the tasks assigned to that user
    public ResponseEntity<List<TaskItem>> getTasksForUser(Integer assignee, String sortBy, String status) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortBy.startsWith("-")) {
            direction = Sort.Direction.DESC;
            sortBy = sortBy.substring(1);
        }

        Sort sort = Sort.by(direction, sortBy);

        if (status.equals("ALL")) {
            List<TaskItem> tasks = taskRepository.findByAssignee(assignee, sort);

            // for (TaskItem taskItem : tasks) {
            //     if (taskItem.getStatus().equals("Cancelled")) {
            //         tasks.remove(taskItem);
            //     }
            // }

            if (tasks.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tasks);
            else
                // return ResponseEntity.ok(tasks);
                return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.NO_CONTENT);
        } else {
            List<TaskItem> tasks = taskRepository.findByAssigneeAndStatus(assignee, status, sort);

            if (tasks.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tasks);
            else
                // return ResponseEntity.ok(tasks);
                return new ResponseEntity<List<TaskItem>>(tasks, HttpStatus.NO_CONTENT);

        }
    }

    // Add a new task
    public ResponseEntity<TaskItem> addTask(TaskItem task) {
        task.setStatus("To do");

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
        } else {
            return new ResponseEntity<TaskItem>(HttpStatus.NOT_FOUND);
        }
    }

    // Sort and filter data
    public ResponseEntity<List<TaskItem>> sortAndFilter(List<TaskItem> tasks, String sortBy, String status) {

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
        if (!status.equals("ALL")) {
            tasks.removeIf(task -> !task.getStatus().equals(status));
        }

        return ResponseEntity.ok(tasks);
    }

}
