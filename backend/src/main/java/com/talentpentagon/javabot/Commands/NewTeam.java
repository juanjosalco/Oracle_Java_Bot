package com.talentpentagon.javabot.Commands;

import org.springframework.http.ResponseEntity;

import com.talentpentagon.javabot.model.Team;

public interface NewTeam<E, T> {
    ResponseEntity<Team> execute(E entity);
}
