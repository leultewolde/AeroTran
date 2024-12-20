package edu.miu.cs425.backend.util;

import edu.miu.cs425.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtil {
    @Value("${jwt.secretKey}")
    private String jwtSecret;

    @Value("${jwt.access.token.expiration}")
    private long accessTokenExpirationMs;


    public String generateAccessToken(User userDetails) {
        return Jwts
                .builder()
                .signWith(signKey())
                .claim("authorities", populateAuthorities(userDetails.getAuthorities()))
                .subject(String.valueOf(userDetails.getId()))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
                .compact();
    }


    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(signKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    private SecretKey signKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    void setJwtSecretForTest(String secret) {
        this.jwtSecret = secret;
    }

    void setAccessTokenExpirationMsForTest(long expirationMs) {
        this.accessTokenExpirationMs = expirationMs;
    }
}
