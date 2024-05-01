package com.talentpentagon.javabot.model;

import java.time.OffsetDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "task")
public class TaskItem {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "assignee_id")
    @NotNull
    private int assignee;

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "description")
    @NotBlank
    private String description;

    @Column(name = "status")
    @NotBlank
    private String status;

    @Column(name = "creation_date")
    @NotNull
    private OffsetDateTime creationDate;

    @Column(name = "due_date")
    @NotNull
    private OffsetDateTime dueDate;

    @Column(name = "status_change_date")
    @NotNull
    private OffsetDateTime statusChangeDate;

    @Column(name = "priority")
    @NotNull
    private Integer priority;

    public TaskItem() {
    }

    public TaskItem(int assignee, String name, String description, Integer priority, OffsetDateTime dueDate) {
        this.assignee = assignee;
        this.name = name;
        this.description = description;
        this.status = "To do";
        this.priority = priority;
        this.dueDate = dueDate;
        this.creationDate = OffsetDateTime.now();
        this.statusChangeDate = OffsetDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getAssignee() {
        return assignee;
    }

    public void setAssignee(int assignee) {
        this.assignee = assignee;
    }

    public String getTaskTitle() {
        return name;
    }

    public void setTaskTitle(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public OffsetDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(OffsetDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public OffsetDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(OffsetDateTime creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "TaskItem{" +
                "id=" + id +
                ", assignee_id=" + assignee +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", priority=" + priority +
                ", due_date=" + dueDate +
                ", creation_date=" + creationDate +
                '}';
    }

}
