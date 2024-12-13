package edu.miu.cs425.backend.dto.response;

import edu.miu.cs425.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private Integer age;
    private String phone;
    private String email;
    private Role role;
    private ZonedDateTime createdDate;
    private ZonedDateTime updatedDate;
}
