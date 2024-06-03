package com.talentpentagon.javabot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.talentpentagon.javabot.model.Auth;
import com.talentpentagon.javabot.repository.AuthRepository;
import com.talentpentagon.javabot.repository.CustomUserRepository;
import com.talentpentagon.javabot.model.CustomUserDTO;
import com.talentpentagon.javabot.model.CustomUser;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private CustomUserRepository customUserRepository;

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

    // Get Blocked Users
    public List<CustomUserDTO> getBlockedUsers() {
        List<CustomUserDTO> blockedUsers = customUserRepository.findAll()
                        .stream()
                        .map(CustomUserDTO::new)
                        .filter(user -> !user.isEnabled())
                        .toList();
        return blockedUsers;
    }

    // Unblock User
    public void unblockUser(Integer id) {
        Optional<CustomUser> user = customUserRepository.findById(id);
        if (user.isPresent()) {
            user.get().setEnabled(true);
            customUserRepository.save(user.get());
        }
    }
}
    