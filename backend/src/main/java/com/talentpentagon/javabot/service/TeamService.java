package com.talentpentagon.javabot.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TeamRepository;
import com.talentpentagon.javabot.model.Team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TeamService {
    
    @Autowired
    private TeamRepository teamRepository;
    
    // Get team by id
    public ResponseEntity<Team> getTeamById(int id){
        Optional<Team> team = teamRepository.findById(id);

        if(team.isPresent()){
            return new ResponseEntity<Team>(team.get(), HttpStatus.OK);
        } 
        else{
            return new ResponseEntity<Team>(HttpStatus.NOT_FOUND);
        } 
    }

    // Get team tasks by team id
    public List<TaskItem> getTeamTasks(int id, String sortBy, String status){
        Optional<Team> team = teamRepository.findById(id);

        try{
            List<TaskItem> tasks = new ArrayList<>();

            if(!team.isPresent()) return null;

            team.get().getMembers().forEach(member -> {
                List<TaskItem> assignedTasks = member.getAssignedTasks();
                if(!assignedTasks.isEmpty()) tasks.addAll(assignedTasks);
            });

            return tasks;
        }
        catch(Exception e){
            return null;
        }
    }

    
}
