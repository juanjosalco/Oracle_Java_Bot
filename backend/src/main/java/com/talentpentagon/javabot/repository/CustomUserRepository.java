package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomUserRepository extends JpaRepository<CustomUser, Integer>{
    Optional<CustomUser> findById(Integer id);
    Optional<CustomUser> findByTeamIdAndRole(int teamId, String role);
}
