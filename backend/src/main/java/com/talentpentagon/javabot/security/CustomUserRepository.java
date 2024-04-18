package com.talentpentagon.javabot.security;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomUserRepository extends JpaRepository<CustomUser, Integer>{
    Optional<CustomUser> findByUsername(String username);
    Optional<CustomUser> findById(Integer id);
}
