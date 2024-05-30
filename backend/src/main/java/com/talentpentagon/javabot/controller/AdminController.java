package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewTeamCommandHandler;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.queryhandlers.GetTeamsHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    private NewTeamCommandHandler newTeamCommandHandler;


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PostMapping("/team")
    public ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestBody Team team){
        return newTeamCommandHandler.execute(team);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @GetMapping("/team")
    public ResponseEntity<?> getTeams(@RequestHeader("Authorization") String token, Void input){
        return getTeamsHandler.execute(input);
    }
}