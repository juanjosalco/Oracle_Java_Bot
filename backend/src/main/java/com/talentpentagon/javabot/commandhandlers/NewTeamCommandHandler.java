package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Commands.NewTeam;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.service.TeamService;

import io.micrometer.common.util.StringUtils;

@Service
public class NewTeamCommandHandler implements NewTeam<Team, ResponseEntity<Team>> {
    @Autowired
    private TeamService teamService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<Team> execute(Team team) {

        // description
        if (StringUtils.isBlank(team.getDescription())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // name
        if (StringUtils.isBlank(team.getName())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        teamService.createTeam(team);

        return ResponseEntity.status(HttpStatus.CREATED).body(team);
    }
}
