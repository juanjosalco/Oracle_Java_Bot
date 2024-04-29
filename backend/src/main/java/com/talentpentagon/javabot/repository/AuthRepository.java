package com.talentpentagon.javabot.repository;

import com.talentpentagon.javabot.model.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Integer>{
    Optional<Auth> findByUid(Integer uid);
    Optional<Auth> findByEmail(String email);
}
