package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.commandhandlers.NewTeamCommandHandler;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.queryhandlers.GetTeamMembersHandler;
import com.talentpentagon.javabot.security.JWTUtil;
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
public class TeamController {

    @Autowired
    private GetTeamMembersHandler getTeamMembersHandler;

    @Autowired
    private NewTeamCommandHandler newTeamCommandHandler;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Manager')")
    @GetMapping("/team/members")
    public ResponseEntity<?> getTeamMembers(@RequestHeader("Authorization") String token){
        Integer teamId = JWTUtil.extractTeamId(token);

        return getTeamMembersHandler.execute(teamId);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Notch')")
    @PostMapping("/team")
    public ResponseEntity<?> createTeam(@RequestHeader("Authorization") String token, @RequestBody Team team){
        return newTeamCommandHandler.execute(team);
    }
}
