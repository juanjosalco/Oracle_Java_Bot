package com.talentpentagon.javabot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.talentpentagon.javabot.model.Team;

public interface TeamRepository extends JpaRepository<Team, Integer>{

    
}
