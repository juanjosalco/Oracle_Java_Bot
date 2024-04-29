package com.talentpentagon.javabot.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Entity
@Data
@Table(name = "team")
public class Team {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "manager")
    private Integer manager;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id")
    private List<CustomUser> members;

    // Getters and setters
    public Team() {
    }

    public Team(Integer manager, String name, String description) {
        this.manager = manager;
        this.name = name;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getManager() {
        return manager;
    }

    public void setManager(Integer manager) {
        this.manager = manager;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CustomUser> getMembers() {
        return members;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", manager=" + manager +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }   

}
