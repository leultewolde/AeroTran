package edu.miu.cs425.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String name;
    private Integer age;
    private String phone;
    private String email;

    private Integer creditCardId;
}
