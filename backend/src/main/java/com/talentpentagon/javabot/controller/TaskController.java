package com.talentpentagon.javabot.controller;

import java.util.List;

import com.talentpentagon.javabot.commandhandlers.EditTaskCommandHandler;
import com.talentpentagon.javabot.commandhandlers.EditTaskStatusCommandHandler;
import com.talentpentagon.javabot.commandhandlers.NewTaskCommandHandler;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;
import com.talentpentagon.javabot.security.JWTUtil;
import com.talentpentagon.javabot.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private NewTaskCommandHandler newTaskCommandHandler;

    @Autowired
    private EditTaskCommandHandler editTaskCommandHandler;

    @Autowired
    private EditTaskStatusCommandHandler editTaskStatusCommandHandler;

    // TEST ONLY
    @GetMapping("task")
    public ResponseEntity<List<TaskItem>> getTasks() {
        List<TaskItem> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get single task
    @PreAuthorize("hasRole('Developer')")
    @GetMapping("task/{id}")
    public ResponseEntity<TaskItem> getTaskById(@PathVariable("id") int id) {
        try {
            ResponseEntity<TaskItem> task = taskService.getTaskById(id);
            return new ResponseEntity<TaskItem>(task.getBody(), task.getStatusCode());
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get all tasks for a team
    @PreAuthorize("hasRole('Manager')")
    @GetMapping("task/team")
    public ResponseEntity<List<TaskItem>> getTasksForTeam(@RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "sortBy", defaultValue = "creationDate") String sortBy,
            @RequestParam(name = "status", defaultValue = "ALL") String status) {

        int teamId = JWTUtil.extractTeamId(token);

        List<TaskItem> tasks = teamService.getTeamTasks(teamId, sortBy, status);

        return taskService.sortAndFilter(tasks, sortBy, status);
    }

    // Get User's tasks
    @PreAuthorize("hasRole('Developer')")
    @GetMapping("task/user")
    public ResponseEntity<List<TaskItem>> getTasksForUser(@RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "sortBy", defaultValue = "creationDate") String sortBy,
            @RequestParam(name = "status", defaultValue = "ALL") String status) {

        int assignee = JWTUtil.extractId(token);

        return taskService.getTasksForUser(assignee, sortBy, status);
    }

    // Add task
    @PreAuthorize("hasRole('Developer')")
    @PostMapping("task")
    public ResponseEntity<TaskItem> postTask(@RequestBody TaskItem task) {
        return newTaskCommandHandler.execute(task);
    }

    // Whole edit
    @PreAuthorize("hasRole('Developer')")
    @PutMapping("task/{id}")
    public ResponseEntity<TaskItem> putTask(@PathVariable int id, @RequestBody TaskItem task) {
        return editTaskCommandHandler.execute(task);
    }

    // Use this only to change the status
    @PreAuthorize("hasRole('Developer')")
    @PutMapping("task/{id}/status")
    public ResponseEntity<TaskItem> putTaskStatus(@PathVariable int id, @RequestBody TaskItem task) {
        return editTaskStatusCommandHandler.execute(task);
    }

}
