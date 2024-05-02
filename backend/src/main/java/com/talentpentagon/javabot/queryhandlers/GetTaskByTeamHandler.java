package com.talentpentagon.javabot.queryhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;

import com.talentpentagon.javabot.Commands.GetCommand;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.repository.TeamRepository;
// import com.talentpentagon.javabot.service.TaskService;
import com.talentpentagon.javabot.service.TeamService;

import java.util.List;

@Service
public class GetTaskByTeamHandler implements GetCommand<Integer, List<TaskItem>> {

    // @Autowired
    // private TaskService taskService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public ResponseEntity<List<TaskItem>> execute(Integer teamId, String sortBy, String status) {
        // Fetch the team from the repository
        Team persistedTeam = teamRepository.findById(teamId).orElse(null);

        // If the team doesn't exist, return not found
        if (persistedTeam == null) {
            throw new RuntimeException("Team not found");
        }

        // Fetch tasks associated with the team
        List<TaskItem> tasks = teamService.getTeamTasks(persistedTeam.getId(), sortBy, status); // ask Diego

        // If no tasks found, return not found
        if (tasks.isEmpty()) {
            throw new RuntimeException("No tasks found");
        }

        // Return the tasks associated with the team
        teamService.getTeamTasks(persistedTeam.getId(), sortBy, status);
        return ResponseEntity.status(HttpStatus.OK).body(tasks);
    }
}
