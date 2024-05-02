package com.talentpentagon.javabot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

// import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.model.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    Optional<Team> findById(Integer id);
}
