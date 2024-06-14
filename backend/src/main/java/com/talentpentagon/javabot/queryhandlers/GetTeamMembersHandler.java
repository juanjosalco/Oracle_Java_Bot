package com.talentpentagon.javabot.queryhandlers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Querys.GetTeamMembersCommand;
import com.talentpentagon.javabot.service.TeamService;

@Service
public class GetTeamMembersHandler implements GetTeamMembersCommand<Integer, Map<Integer, String>> {

    @Autowired
    private TeamService teamService;

    @Override
    public ResponseEntity<Map<Integer, String>> execute(Integer teamId) {

        Map<Integer, String> teamMembers = teamService.getTeamMembers(teamId);

        if (teamMembers == null || teamMembers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(teamMembers);
    }
}
