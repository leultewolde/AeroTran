package edu.miu.cs425.backend.util;

import edu.miu.cs425.backend.model.Role;
import edu.miu.cs425.backend.model.User;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        // Set your own secret. It must be at least 32 bytes for HMAC-SHA keys.
        String secret = "thisisasecretthisisasecretthisisasec";
        jwtUtil.setJwtSecretForTest(secret);

        // Set a short expiration for testing, e.g., 1 hour
        jwtUtil.setAccessTokenExpirationMsForTest(3600000L); // 1 hour in ms
    }

    @Test
    void generateAndValidateToken() {
        // Given a UserDetails object
        User foundUser = new User();
        foundUser.setId(1L);

        foundUser.setRole(Role.REGULAR);
//        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
//                "testUser",
//                "password",
//                List.of(new SimpleGrantedAuthority("ROLE_REGULAR"), new SimpleGrantedAuthority("ROLE_ADMIN"))
//        );

        // When
        String token = jwtUtil.generateAccessToken(foundUser);

        // Then - Validate the token
        Claims claims = jwtUtil.getClaimsFromToken(token);

        String authorities = (String) claims.get("authorities");
        List<String> actualRoles = Arrays.asList(authorities.split(","));

        assertThat(claims.getSubject()).isEqualTo("1");
        assertThat(actualRoles).containsExactlyInAnyOrder("ROLE_REGULAR");
    }
}
