package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;
import java.util.List;

public interface CustomUserRepository extends JpaRepository<CustomUser, Integer>{
    @NonNull
    Optional<CustomUser> findById(@NonNull Integer id);
    
    List<CustomUser> findAll();
    Optional<CustomUser> findByTeamIdAndRole(int teamId, String role);
}
