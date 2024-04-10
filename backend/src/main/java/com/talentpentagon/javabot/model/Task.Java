package com.talentpentagon.javabot.model;


@Entity
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int ID;
    @Column(name = "Description")
    String description;
    @Column(name = "Creation Date")
    OffsetDateTime creationDate;
    @Column(name = "Status")
    string status;
    public Task(){

    }
    public Task(int ID, String description, OffsetDateTime creationDate, String status) {
        this.ID = ID;
        this.description = description;
        this.creationDate = creationDate;
        this.status = status;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OffsetDateTime getcreationDate() {
        return creationDate;
    }

    public void setcreationDate(OffsetDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isstatus() {
        return status;
    }

    public void setstatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Task{" +
                "ID=" + ID +
                ", description='" + description + '\'' +
                ", creationDate=" + creationDate +
                ", status=" + status +
                '}';
    }
}