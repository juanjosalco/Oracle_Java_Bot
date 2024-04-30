package com.talentpentagon.javabot.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String message;

    public JwtResponse(String message){
        this.message = "Success";
    }

}
