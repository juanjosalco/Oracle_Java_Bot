package com.talentpentagon.javabot.security;

import java.util.Date;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Key;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.MalformedJwtException;



public class JWTUtil {
   private static Key SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);
   private static final long EXPIRATION = 854_000_000; // Time in ms

    private static final Logger logger = LoggerFactory.getLogger(JWTUtil.class);
    
    public static String generateToken(String email, String role, int id, int teamId){

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .claim("role", role)
                .claim("id", id)
                .claim("team", teamId)
                .signWith(SECRET)
                .compact();
    }

    // Extract username
    public static String extractUsername(String token){
        if(token != null && token.startsWith("Bearer ")) token = token.substring(7); 
        return Jwts.parserBuilder()
                    .setSigningKey(SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
    }

    // Extract role
    public static String extractRole(String token){
        if(token != null && token.startsWith("Bearer ")) token = token.substring(7); 
        return Jwts.parserBuilder()
                    .setSigningKey(SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);
    }

    // Extract ID
    public static int extractId(String token){
        if(token != null && token.startsWith("Bearer ")) token = token.substring(7); 
        return Jwts.parserBuilder()
                    .setSigningKey(SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id", Integer.class);
    }

    // Extract team ID
    public static int extractTeamId(String token){
        if(token != null && token.startsWith("Bearer ")) token = token.substring(7); 
        return Jwts.parserBuilder()
                    .setSigningKey(SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("team", Integer.class);
    }

    public static boolean validateToken(String token){
        try{
            Jwts.parserBuilder()
            .setSigningKey(SECRET)
            .build()
            .parseClaimsJws(token);
            return true;
        }
        catch(ExpiredJwtException e){
            logger.error("Expired token: ", e);
            return false;
        }
        catch(MalformedJwtException e){
            logger.error("Malformed token: ", e);
            return false;
        }
        catch(IllegalArgumentException e){
            logger.error("Invalid token: ", e);
            return false;
        }
    }
}
