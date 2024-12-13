package edu.miu.cs425.backend.mapper;

import edu.miu.cs425.backend.dto.request.RegisterRequest;
import edu.miu.cs425.backend.dto.response.UserResponse;
import edu.miu.cs425.backend.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest request) {
        if (request == null) {
            return null;
        }

        return new User(
                request.getName(),
                request.getAge(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );
    }

    public UserResponse toDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getAge(),
                user.getPhone(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedDate(),
                user.getUpdatedDate()
        );
    }

    public List<UserResponse> toDto(List<User> users) {
        return users.stream().map(this::toDto).toList();
    }
}
