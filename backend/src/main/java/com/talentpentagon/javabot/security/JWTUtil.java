package com.talentpentagon.javabot.security;

import java.util.Date;
import java.security.Key;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureException;


public class JWTUtil {
   private static Key SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);
   private static final long EXPIRATION = 864_000_000; // 10 Days

    public static String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET)
                .compact();
    }

    // EXTRACT USERNAME GOES HERE
    public static String extractUsername(String token){
        return Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
    }

    // TOKEN VALIDATION GOES HERE
    public static boolean validateToken(String token){
        try{
            Jwts.parser()
            .setSigningKey(SECRET)
            .parseClaimsJws(token);
            return true;
        }
        catch(SignatureException e){
            System.out.println("Signature exception: " + e.getMessage());
            return false;
        }
        catch(ExpiredJwtException e){
            System.out.println("Expired token: " + e.getMessage());
            return false;
        }
    }
}
