package com.talentpentagon.javabot.queryhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

import com.talentpentagon.javabot.model.TeamDTO;
import com.talentpentagon.javabot.service.TeamService;

@Service
public class GetTeamsHandler implements Query<List<TeamDTO>>{
    
    @Autowired
    private TeamService teamService;

    @Override
    public ResponseEntity<List<TeamDTO>> execute() {

        List<TeamDTO> teams = teamService.getTeams();

        return ResponseEntity.status(HttpStatus.OK).body(teams);
    }
}
