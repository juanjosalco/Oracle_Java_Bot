package com.talentpentagon.javabot.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name="auth")
@Data
public class Auth {

    @Id
    @Column(name = "user_id", unique = true, nullable = false)
    private int uid;

    @Column(name = "email", unique = true)
    @NotBlank
    private String email;

    @Column(name = "password")
    @NotBlank
    private String password;

    @Column(name = "login_attempts")
    private int attempts;

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_id")
    private CustomUser user;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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


    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public CustomUser getUser() {
        return user;
    }

    public void setUser(CustomUser user) {
        this.user = user;
    }

    public Auth() {
    }

    public Auth(int uid, int attempts, boolean isEnabled, String email, String password, CustomUser user) {
        this.uid = uid;
        this.attempts = attempts;
        this.isEnabled = isEnabled;
        this.email = email;
        this.password = password;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Auth{" +
                "uid=" + uid +
                ", attempts=" + attempts +
                ", isEnabled=" + isEnabled +
                ", email='" + email  +
                ", password='" + password +
                '}';
    }
}
