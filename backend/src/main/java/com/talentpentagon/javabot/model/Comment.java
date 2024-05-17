package com.talentpentagon.javabot.model;

import java.sql.Timestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "commentary")
public class Comment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "commenter_id")
    @NotNull
    private int commenterId;

    @Column(name = "task_id")
    @NotNull
    private int taskId;

    @Column(name = "creation_date")
    @NotNull
    private Timestamp creationDate;

    @Column(name = "message")
    @NotBlank
    private String message;

    public Comment() {
    }

    public Comment(int commenterId, int taskId, Timestamp creationDate, String message) {
        this.commenterId = commenterId;
        this.taskId = taskId;
        this.creationDate = creationDate;
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getCommenterId() {
        return commenterId;
    }

    public void setCommenterId(int commenterId) {
        this.commenterId = commenterId;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", commenter_id=" + commenterId +
                ", task_id=" + taskId +
                ", creation_date=" + creationDate +
                ", message='" + message + '\'' +
                '}';
    }
}
