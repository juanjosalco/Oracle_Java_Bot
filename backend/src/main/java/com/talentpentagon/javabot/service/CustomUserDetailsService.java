package com.talentpentagon.javabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.talentpentagon.javabot.model.CustomUser;
import com.talentpentagon.javabot.repository.CustomUserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private CustomUserRepository customUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CustomUser customUser = customUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User
                .withUsername(customUser.getUsername())
                .password(customUser.getPassword())
                .build();
    }

    // Method to load user by ID
    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        CustomUser customUser = customUserRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User
                .withUsername(customUser.getUsername())
                .password(customUser.getPassword())
                .build();
    }

}
    