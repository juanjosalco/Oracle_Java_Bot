package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewTeamCommandHandler;
import com.talentpentagon.javabot.model.Auth;
import com.talentpentagon.javabot.model.CustomUser;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.queryhandlers.GetTeamsHandler;
import com.talentpentagon.javabot.repository.AuthRepository;
import com.talentpentagon.javabot.repository.CustomUserRepository;
import com.talentpentagon.javabot.security.SignupRequest;
import com.talentpentagon.javabot.service.TaskService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    private GetTeamsHandler getTeamsHandler;
    @Autowired
    private CustomUserRepository customUserRepository;
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private NewTeamCommandHandler newTeamCommandHandler;
    @Autowired
    private TaskService taskService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


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
    public ResponseEntity<?> getTeams(@RequestHeader("Authorization") String token, Void input){
        return getTeamsHandler.execute(input);
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
    

    // AUTH + USER CONTROLLER
    // TODO: EITHER FIX THE ROLE CHECK OR REMOVE IT
    @Transactional
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PostMapping("/signUp")
    public ResponseEntity<String> createUser(@RequestBody SignupRequest user) {
        Optional<Auth> credentials = authRepository.findByEmail(user.getEmail());
        // Optional<CustomUser> roleCheck = customUserRepository.findByTeamIdAndRole(request.getTeamId(), request.getRole());

        if(credentials.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        // if(roleCheck.isPresent()){
        //     return ResponseEntity.status(HttpStatus.CONFLICT).body("Team " + request.getTeamId() + " already has an assigned manager.");
        // }

        CustomUser newUser = new CustomUser();
        newUser.setFirstName(user.getFirstname());
        newUser.setLastName(user.getLastname());
        newUser.setPhonenumber(user.getPhonenumber());
        newUser.setRole(user.getRole());
        newUser.setTeamId(user.getTeamId());


        Auth newAuth = new Auth();
        newAuth.setEmail(user.getEmail());
        newAuth.setPassword(passwordEncoder.encode(user.getPassword()));
        newAuth.setUser(newUser);
        newAuth.setAttempts(0);
        newAuth.setEnabled(true);

        CustomUser savedUser = customUserRepository.save(newUser);
        newAuth.setUser(newUser);
        Auth savedAuth = authRepository.save(newAuth);

        if (savedUser == null || savedAuth == null) {
            throw new RuntimeException("Failed to create user or auth");
        }
        
        return ResponseEntity.ok("User created successfully");
    }
}