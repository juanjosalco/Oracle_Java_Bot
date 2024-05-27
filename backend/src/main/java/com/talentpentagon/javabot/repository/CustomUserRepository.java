package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface CustomUserRepository extends JpaRepository<CustomUser, Integer>{
    @NonNull
    Optional<CustomUser> findById(@NonNull Integer id);

    Optional<CustomUser> findByTeamIdAndRole(int teamId, String role);
}
