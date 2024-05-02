package com.talentpentagon.javabot.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;

    JwtResponse(){
        
    }
}
