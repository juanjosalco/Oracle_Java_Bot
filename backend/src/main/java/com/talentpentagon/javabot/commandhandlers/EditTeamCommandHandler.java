package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.Commands.PostPutCommand;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.service.TeamService;

import io.micrometer.common.util.StringUtils;

@Service
public class EditTeamCommandHandler implements PostPutCommand<Team, ResponseEntity<Team>>  {
    @Autowired
    private TeamService teamService;

    String specialChars = ".*[^@$%^&*()_+=\\[\\]{}'\"\\\\|<>\\/].*";

    @Override
    public ResponseEntity<Team> execute(Integer id, Team team) {
        // name
        if (StringUtils.isBlank(team.getName())) {
            throw new RuntimeException("Team name cannot be empty");
        }
        if (!team.getName().matches(specialChars)) {
            throw new RuntimeException("Team name cannot contain special characters");
        }

        // Description
        if (StringUtils.isBlank(team.getDescription())) {
            throw new RuntimeException("Team description cannot be empty");
        }
        if (!team.getDescription().matches(specialChars)) {
            throw new RuntimeException("Team description cannot contain special characters");
        }


        teamService.editTeam(id, team);

        return ResponseEntity.status(HttpStatus.CREATED).body(team);
    }
}
