package com.talentpentagon.javabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.talentpentagon.javabot.model.Auth;
import com.talentpentagon.javabot.repository.AuthRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Auth tpAuth = authRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User
                .withUsername(tpAuth.getEmail())
                .password(tpAuth.getPassword())
                .build();
    }

    // Method to load user by ID
    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        Auth tpAuth = authRepository.findByUid(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User
                .withUsername(tpAuth.getEmail())
                .password(tpAuth.getPassword())
                .build();
    }

}
    