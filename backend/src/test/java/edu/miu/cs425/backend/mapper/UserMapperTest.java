package edu.miu.cs425.backend.mapper;

import edu.miu.cs425.backend.dto.request.RegisterRequest;
import edu.miu.cs425.backend.dto.response.UserResponse;
import edu.miu.cs425.backend.model.Role;
import edu.miu.cs425.backend.model.User;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class UserMapperTest {

    private final UserMapper mapper = new UserMapper();

    @Test
    void toEntity_givenValidRegisterRequest_returnsUser() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setAge(30);
        request.setPhone("1234567890");
        request.setEmail("john@example.com");
        request.setPassword("password123");
        request.setRole(Role.REGULAR);

        // When
        User result = mapper.toEntity(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("John Doe");
        assertThat(result.getAge()).isEqualTo(30);
        assertThat(result.getPhone()).isEqualTo("1234567890");
        assertThat(result.getEmail()).isEqualTo("john@example.com");
        assertThat(result.getPassword()).isEqualTo("password123");
        assertThat(result.getRole()).isEqualTo(Role.REGULAR);
    }

    @Test
    void toEntity_givenNullRequest_returnsNull() {
        // When
        User result = mapper.toEntity(null);

        // Then
        assertThat(result).isNull();
    }

    @Test
    void toDto_givenValidUser_returnsUserResponse() {
        // Given
        User user = new User();
        user.setId(1L);
        user.setName("Jane Doe");
        user.setAge(25);
        user.setPhone("0987654321");
        user.setEmail("jane@example.com");
        user.setRole(Role.REGULAR);
        ZonedDateTime createdDate = ZonedDateTime.now();
        ZonedDateTime updatedDate = ZonedDateTime.now().plusHours(1);
        user.setCreatedDate(createdDate);
        user.setUpdatedDate(updatedDate);

        // When
        UserResponse response = mapper.toDto(user);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("Jane Doe");
        assertThat(response.getAge()).isEqualTo(25);
        assertThat(response.getPhone()).isEqualTo("0987654321");
        assertThat(response.getEmail()).isEqualTo("jane@example.com");
        assertThat(response.getRole()).isEqualTo(Role.REGULAR);
        assertThat(response.getCreatedDate()).isEqualTo(createdDate);
        assertThat(response.getUpdatedDate()).isEqualTo(updatedDate);
    }

    @Test
    void toDto_givenNullUser_returnsNull() {
        // When
        UserResponse response = mapper.toDto((User) null);

        // Then
        assertThat(response).isNull();
    }

    @Test
    void toDto_givenListOfUsers_returnsListOfUserResponses() {
        // Given
        User user1 = new User();
        user1.setId(1L);
        user1.setName("UserOne");

        User user2 = new User();
        user2.setId(2L);
        user2.setName("UserTwo");

        List<User> users = List.of(user1, user2);

        // When
        List<UserResponse> responses = mapper.toDto(users);

        // Then
        assertThat(responses).hasSize(2);
        assertThat(responses.get(0).getId()).isEqualTo(1L);
        assertThat(responses.get(0).getName()).isEqualTo("UserOne");
        assertThat(responses.get(1).getId()).isEqualTo(2L);
        assertThat(responses.get(1).getName()).isEqualTo("UserTwo");
    }
}