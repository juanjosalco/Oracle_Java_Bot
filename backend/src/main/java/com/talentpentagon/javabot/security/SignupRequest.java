package com.talentpentagon.javabot.security;

public class SignupRequest {
    private String email;
    private String password;
    private String role;
    private String firstname;
    private String lastname;
    private String phonenumber;
    private int teamId;



    // Generate getters and setters

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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
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

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public SignupRequest(String email, String password, String role, String firstname, String lastname,
            String phonenumber, int teamId) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "SignupRequest [email=" + email + ", password=" + password + ", role=" + role + ", firstname="
                + firstname + ", lastname=" + lastname + ", phonenumber=" + phonenumber + ", teamId=" + teamId + "]";
    }

    

}
