package com.talentpentagon.javabot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

// import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.model.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    @NonNull
    Optional<Team> findById(@NonNull Integer id);
}
