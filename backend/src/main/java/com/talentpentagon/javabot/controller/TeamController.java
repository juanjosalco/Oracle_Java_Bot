package com.talentpentagon.javabot.controller;

import com.talentpentagon.javabot.service.TeamService;
import com.talentpentagon.javabot.security.JWTUtil;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
public class TeamController {

    @Autowired  
    private TeamService teamService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PreAuthorize("hasRole('Manager')")
    @GetMapping("team/members")
    public ResponseEntity<?> getTeamMembers(@RequestHeader("Authorization") String token){
        Integer teamId = JWTUtil.extractTeamId(token);

        ArrayList<String> teamMembers = teamService.getTeamMembers(teamId);

        if(teamMembers == null || teamMembers.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No team members found.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(teamService.getTeamMembers(teamId));
    }
    

}
