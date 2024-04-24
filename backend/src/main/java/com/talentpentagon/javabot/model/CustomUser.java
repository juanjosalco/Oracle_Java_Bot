package com.talentpentagon.javabot.model;

import jakarta.persistence.*;

import lombok.Data;
import java.util.List;

@Entity
@Table(name="staff")
@Data
public class CustomUser {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "team_id")
    private int teamId;

    @Column(name = "username")
    private String username;

    @Column(name = "pass")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "phonenumber")
    private String phonenumber;

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @Column(name = "login_attempts")
    private int attempts;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "assignee_id")
    private List<TaskItem> assignedTasks;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastName) {
        this.lastname = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public List<TaskItem> getAssignedTasks() {
        return assignedTasks;
    }

    public CustomUser() {
    }

    public CustomUser(int teamId, String username, String password, String role, String firstname, String lastname, String email, String phonenumber) {
        this.teamId = teamId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.isEnabled = true;
        this.attempts = 0;
    }
}
