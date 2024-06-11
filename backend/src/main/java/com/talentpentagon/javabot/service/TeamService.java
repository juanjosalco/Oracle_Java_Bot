package com.talentpentagon.javabot.service;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashMap;

import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.TeamRepository;
import com.talentpentagon.javabot.model.Team;
import com.talentpentagon.javabot.model.TeamDTO;

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
    public List<TaskItem> getTeamTasks(int id, String sortBy, String status, Integer priority) {
        Optional<Team> teamOptional = teamRepository.findById(id); // Hypothetical method to fetch team with members and tasks in one query

        if (!teamOptional.isPresent()) return new ArrayList<>();
            Team team = teamOptional.get();
            List<TaskItem> tasks = team.getMembers().stream()
                .flatMap(member -> member.getAssignedTasks().stream())
                .filter(task -> status.equals("ALL") || task.getStatus().equals(status)) // Filter by status
                .filter(task -> priority == 0 || task.getPriority().equals(priority)) // Filter by priority
                .collect(Collectors.toList()); // Collect filtered tasks

            if(!status.equals("Cancelled")) tasks.removeIf(task -> task.getStatus().equals("Cancelled") || task.isArchived());

            // Sort by
            if (sortBy.equals("creationDate")) {
                tasks.sort((t1, t2) -> t1.getCreationDate().compareTo(t2.getCreationDate()));
            } else if (sortBy.equals("dueDate")) {
                tasks.sort((t1, t2) -> t1.getDueDate().compareTo(t2.getDueDate()));
            } else if (sortBy.equals("priority")) {
                tasks.sort((t1, t2) -> t1.getPriority().compareTo(t2.getPriority()));
            }

            return tasks;
        
    }

    // Get team members by team id
    public Map<Integer, String> getTeamMembers(Integer id){
        Optional<Team> team = teamRepository.findById(id);

        try{
            Map<Integer, String> members = new HashMap<>();

            if(!team.isPresent()) return null;
                team.get().getMembers().forEach(member -> {
                    members.put(member.getId(), member.getFirstName() + " " + member.getLastName());
            });


            return members;
        }
        catch(Exception e){
            return null;
        }
    }

    // Get team list
    public List<TeamDTO> getTeams(){
        List<TeamDTO> teams = teamRepository.findAll()
                        .stream()
                        .map(TeamDTO::new)
                        .toList();
        return teams;
    }

    // Create team
    public ResponseEntity<Team> createTeam(Team team){
        Team newTeam = teamRepository.save(team);
        return new ResponseEntity<Team>(newTeam, HttpStatus.CREATED);
    }

    // Edit team
    public ResponseEntity<Team> editTeam(Integer id, Team team){
        Optional<Team> teamOptional = teamRepository.findById(id);

        if(!teamOptional.isPresent()){
            return new ResponseEntity<Team>(HttpStatus.NOT_FOUND);
        }
        Team editedTeam = teamRepository.save(team);
        editedTeam.setId(id);
        editedTeam.setName(team.getName());
        editedTeam.setDescription(team.getDescription());
        return new ResponseEntity<Team>(editedTeam, HttpStatus.CREATED);

        
    }
}
