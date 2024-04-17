package com.talentpentagon.javabot.security;

import com.talentpentagon.javabot.security.LoginRequest;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class SecurityController {
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request) {
        // LOGIN LOGIC GOES HERE

        if(request.getUsername().equals("root") && request.getPassword().equals("root123456")){
            // Generate JWT Token
            String token = JWTUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    
}
