package com.talentpentagon.javabot.security;

import org.springframework.web.bind.annotation.RestController;
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
        
        try{
            
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Generate JWT Token
            String jwtToken = JWTUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwtToken));

        } catch (Exception e) {
            System.out.println("Received Password: " + request.getPassword());
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        
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

        customUserRepository.save(newUser);
        return ResponseEntity.ok("User created successfully");
    }
        
}
