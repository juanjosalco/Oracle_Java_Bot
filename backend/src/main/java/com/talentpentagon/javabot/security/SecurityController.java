package com.talentpentagon.javabot.security;

import org.springframework.web.bind.annotation.RestController;

import com.talentpentagon.javabot.repository.AuthRepository;
import com.talentpentagon.javabot.repository.CustomUserRepository;
import com.talentpentagon.javabot.model.Auth;
import com.talentpentagon.javabot.model.CustomUser;
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
    private AuthRepository authRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest request) {
        Optional<Auth> authConfirmation = authRepository.findByEmail(request.getEmail());

        if(authConfirmation.isPresent()){
            if(!authConfirmation.get().isEnabled()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Account locked"));
            System.out.println("Auth: " + authConfirmation.get());
            try {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
                Authentication authentication = authenticationManager.authenticate(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
        
                int uid = authRepository.findByEmail(request.getEmail()).get().getUid();
    
                // Get user data
                CustomUser user = customUserRepository.findById(uid).get();
                String role = user.getRole();
                String email = authConfirmation.get().getEmail();
                int teamId = user.getTeamId();
        
                // Generate JWT token
                String jwtToken = JWTUtil.generateToken(email, role, uid, teamId);
        
                return ResponseEntity.ok(new JwtResponse(jwtToken, "Success"));

            } catch (Exception e) {
    
                Auth authentication = authConfirmation.get();
                if (authentication.getAttempts() >= 3) {
                    authentication.setEnabled(false);
                    authRepository.save(authentication);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Account locked"));
                } else {
                    authentication.setAttempts(authentication.getAttempts() + 1);
                    authRepository.save(authentication);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Invalid credentials"));
                }

            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("User not found"));
        
    }

    @PostMapping("/signUp")
    public ResponseEntity<String> createUser(@RequestBody SignupRequest request) {
        Optional<Auth> credentials = authRepository.findByEmail(request.getEmail());

        if(credentials.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        CustomUser newUser = new CustomUser();
        newUser.setFirstName(request.getFirstname());
        newUser.setLastName(request.getLastname());
        newUser.setPhonenumber(request.getPhonenumber());
        newUser.setRole(request.getRole());
        newUser.setTeamId(request.getTeamId());


        Auth newAuth = new Auth();
        newAuth.setEmail(request.getEmail());
        newAuth.setPassword(passwordEncoder.encode(request.getPassword()));
        newAuth.setUser(newUser);
        newAuth.setAttempts(0);
        newAuth.setEnabled(true);

        customUserRepository.save(newUser);
        newAuth.setUser(newUser);
        authRepository.save(newAuth);
        
        return ResponseEntity.ok("User created successfully");
    }
        
}
