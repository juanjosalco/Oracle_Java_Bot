package com.talentpentagon.javabot.model;

import lombok.Data;

@Data
public class TeamDTO {


    private Integer id;
    private Integer manager;
    private String name;
    private String description;

    // Getters and setters
    public TeamDTO(Team team) {
        this.manager = team.getManager();
        this.name = team.getName();
        this.description = team.getDescription();
    }

}
