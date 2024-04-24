package com.talentpentagon.javabot.security;

import org.springframework.web.bind.annotation.RestController;

import com.talentpentagon.javabot.repository.CustomUserRepository;
import com.talentpentagon.javabot.model.CustomUser;
import com.talentpentagon.javabot.model.Team;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

@RestController
public class SecurityController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserRepository customUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request) {
        Optional<CustomUser> userOptional = customUserRepository.findByUsername(request.getUsername());

        if(userOptional.isPresent()){
            if(!userOptional.get().isEnabled()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account locked");
            
            try {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
                Authentication authentication = authenticationManager.authenticate(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
        
                String username = request.getUsername();
    
                // Get user data
                CustomUser user = userOptional.get();
                String role = user.getRole();
                int id = user.getId();
                int teamId = user.getTeamId();
        
                System.out.println("User: " + username + " Role: " + role + " ID: " + id + " Team: " + teamId);
                // Generate JWT token
                String jwtToken = JWTUtil.generateToken(username, role, id, teamId);
        
                return ResponseEntity.ok(new JwtResponse(jwtToken));

            } catch (Exception e) {
    
                CustomUser user = userOptional.get();
                if (user.getAttempts() >= 3) {
                    user.setEnabled(false);
                    customUserRepository.save(user);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account locked");
                } else {
                    user.setAttempts(user.getAttempts() + 1);
                    customUserRepository.save(user);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }

            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        
    }

    @PostMapping("/signUp")
    public ResponseEntity createUser(@RequestBody SignupRequest request) {
        Optional<CustomUser> user = customUserRepository.findByUsername(request.getUsername());

        if(user.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        CustomUser newUser = new CustomUser();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        newUser.setFirstName(request.getFirstname());
        newUser.setLastName(request.getLastname());
        newUser.setPhonenumber(request.getPhonenumber());
        newUser.setRole(request.getRole());
        newUser.setTeamId(request.getTeamId());
        newUser.setAttempts(0);
        newUser.setEnabled(true);

        customUserRepository.save(newUser);
        return ResponseEntity.ok("User created successfully");
    }
        
}
