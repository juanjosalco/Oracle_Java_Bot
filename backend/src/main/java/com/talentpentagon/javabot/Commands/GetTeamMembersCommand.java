package com.talentpentagon.javabot.Commands;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface GetTeamMembersCommand<E, T> {
    ResponseEntity<Map<Integer, String>> execute(E entity);
}
