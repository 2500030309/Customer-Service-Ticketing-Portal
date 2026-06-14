package com.ticketportal.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    public final String SECRET_KEY =
            "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321";

    public final SecretKey key =
            Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    
    public String generateJWT(String username, String role)
            throws Exception {

        Map<String, Object> payload = new HashMap<>();

        payload.put("username", username);
        payload.put("role", role);

        return Jwts.builder()
                .claims(payload)
                .issuedAt(new Date())
                .expiration(new Date(
                        new Date().getTime() + 86400000))
                .signWith(key)
                .compact();
    }

    
    public Map<String, Object> validateJWT(String token)
            throws Exception {

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        Date expiration = claims.getExpiration();

        if (expiration.before(new Date())) {
            throw new Exception("Invalid Token");
        }

        Map<String, Object> payload =
                new HashMap<>();

        payload.put("username",
                claims.get("username"));

        payload.put("role",
                claims.get("role"));

        return payload;
    }
}