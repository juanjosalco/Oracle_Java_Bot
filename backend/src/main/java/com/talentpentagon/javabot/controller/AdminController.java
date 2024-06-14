package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewTeamCommandHandler;
import com.talentpentagon.javabot.commandhandlers.UnblockUserCommandHandler;
import com.talentpentagon.javabot.model.CustomUserDTO;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.queryhandlers.GetBlockedUsersHandler;
import com.talentpentagon.javabot.queryhandlers.GetTeamsHandler;
import com.talentpentagon.javabot.service.TaskService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.talentpentagon.javabot.service.CustomUserDetailsService;



@RestController
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    private GetTeamsHandler getTeamsHandler;
    @Autowired
    private NewTeamCommandHandler newTeamCommandHandler;
    @Autowired
    private GetBlockedUsersHandler getBlockedUsersHandler;
    @Autowired
    private UnblockUserCommandHandler UnblockUserCommandHandler;
    @Autowired
    private TaskService taskService;
    @Autowired
    private CustomUserDetailsService CustomUserDetailsService;

    // TEAM CONTROLLER
    // Creates a new team
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PostMapping("/team")
    public ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestBody Team team){
        return newTeamCommandHandler.execute(team);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PutMapping("/team")
    public ResponseEntity<?> updateTeam(@RequestHeader("Authorization") String token, @RequestBody Team team){
        return newTeamCommandHandler.execute(team);
    }

    // Gets all teams
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @GetMapping("/team")
    public ResponseEntity<?> getTeams(@RequestHeader("Authorization") String token){
        return getTeamsHandler.execute();
    }


    // TASK CONTROLLER
    // Gets all tasks - TEST ONLY
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @GetMapping("/task")
    public ResponseEntity<List<TaskItem>> getTasks() {
        List<TaskItem> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);
    }

    // USER CONTROLLER
    // Gets all blocked users
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @GetMapping("/user/blocked")
    public ResponseEntity<List<CustomUserDTO>> getBlockedUsers() {
        return getBlockedUsersHandler.execute();
    }

    // Unlocks a user
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PutMapping("/user/unblock")
    public ResponseEntity<?> unblockUser(@RequestBody Integer userID) {
        return UnblockUserCommandHandler.execute(userID);
    }

    // Gets all manager users
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @GetMapping("/user/manager")
    public ResponseEntity<List<CustomUserDTO>> getManagerUsers() {
        List<CustomUserDTO> managerUsers = CustomUserDetailsService.getManagerUsers();
        return ResponseEntity.ok(managerUsers);
    }
}