package com.talentpentagon.javabot.model;

import lombok.Data;

@Data
public class CustomUserDTO {

    private int id;
    private int teamId;
    private String role;
    private String firstname;
    private String lastname;
    private boolean isEnabled;

    public CustomUserDTO(CustomUser customUser) {
        this.id = customUser.getId();
        this.teamId = customUser.getTeamId();
        this.role = customUser.getRole();
        this.firstname = customUser.getFirstName();
        this.lastname = customUser.getLastName();
        this.isEnabled = customUser.isEnabled();
    }
}
