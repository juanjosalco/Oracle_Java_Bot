package com.talentpentagon.javabot.controller;

import java.util.List;

// import com.talentpentagon.javabot.commandhandlers.EditTaskCommandHandler;
// import com.talentpentagon.javabot.commandhandlers.EditTaskStatusCommandHandler;
// import com.talentpentagon.javabot.commandhandlers.GetTaskByIdCommandHandler;
// import com.talentpentagon.javabot.commandhandlers.GetTaskByUserCommandHandler;
// import com.talentpentagon.javabot.commandhandlers.NewTaskCommandHandler;
// import com.talentpentagon.javabot.commandhandlers.GetTaskByTeamHandler;
import com.talentpentagon.javabot.commandhandlers.*;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.queryhandlers.GetTaskByIdCommandHandler;
import com.talentpentagon.javabot.queryhandlers.GetTaskByTeamHandler;
import com.talentpentagon.javabot.queryhandlers.GetTaskByUserCommandHandler;
import com.talentpentagon.javabot.service.TaskService;
import com.talentpentagon.javabot.security.JWTUtil;
// import com.talentpentagon.javabot.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    // @Autowired
    // private TeamService teamService;

    @Autowired
    private NewTaskCommandHandler newTaskCommandHandler;

    @Autowired
    private EditTaskCommandHandler editTaskCommandHandler;

    @Autowired
    private EditTaskStatusCommandHandler editTaskStatusCommandHandler;

    @Autowired
    private GetTaskByIdCommandHandler getTaskByIdCommandHandler;

    @Autowired
    private GetTaskByUserCommandHandler getTaskByUserCommandHandler;

    @Autowired
    private GetTaskByTeamHandler getTaskByTeamHandler;

    // TEST ONLY
    @GetMapping("task")
    public ResponseEntity<List<TaskItem>> getTasks() {
        List<TaskItem> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);
    }

    // Get single task
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer') || hasRole('Manager')")
    @GetMapping("task/{id}")
    public ResponseEntity<TaskItem> getTaskById(@PathVariable("id") int id) {

        return getTaskByIdCommandHandler.execute(id);
    }

    // Get all tasks for a team
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Manager')")
    @GetMapping("task/team")
    public ResponseEntity<List<TaskItem>> getTasksForTeam(@RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "sortBy", defaultValue = "creationDate") String sortBy,
            @RequestParam(name = "status", defaultValue = "ALL") String status) {

        int teamId = JWTUtil.extractTeamId(token);

        return getTaskByTeamHandler.execute(teamId, sortBy, status); // ask Diego
    }

    // Get User's tasks
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @GetMapping("task/user")
    public ResponseEntity<List<TaskItem>> getTasksForUser(@RequestHeader(name = "Authorization") String token,
            @RequestParam(name = "sortBy", defaultValue = "creationDate") String sortBy,
            @RequestParam(name = "status", defaultValue = "ALL") String status) {

        int assignee = JWTUtil.extractId(token);

        // return taskService.getTasksForUser(assignee, sortBy, status);
        return getTaskByUserCommandHandler.execute(assignee, sortBy, status);
    }

    // Add task
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @PostMapping("task")
    public ResponseEntity<TaskItem> postTask(@RequestBody TaskItem task) {
        task.setStatus("To do");
        return newTaskCommandHandler.execute(task);
    }

    // TODO: BUG - THIS INSERTS A NEW TASK
    // Whole edit
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @PutMapping("task/{id}")
    public ResponseEntity<TaskItem> putTask(@PathVariable int id, @RequestBody TaskItem task) {
        TaskItem t = getTaskByIdCommandHandler.execute(id).getBody();
        if(t!=null){
            t.setDescription(task.getDescription());
            t.setTaskTitle(task.getTitle());
            t.setDueDate(task.getDueDate());
            t.setPriority(task.getPriority());
            t.setStatus(task.getStatus());
            t.setStatusChangeDate(task.getStatusChangeDate());
        }
        return editTaskCommandHandler.execute(t);
    }

    // Use this only to change the status
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Developer')")
    @PutMapping("task/{id}/status")
    public ResponseEntity<TaskItem> putTaskStatus(@PathVariable int id, @RequestBody TaskItem task) {
        TaskItem t = getTaskByIdCommandHandler.execute(id).getBody();
        if(t != null){
            t.setStatus(task.getStatus());
            t.setStatusChangeDate(task.getStatusChangeDate());
        }
        return editTaskStatusCommandHandler.execute(t);
    }

}
