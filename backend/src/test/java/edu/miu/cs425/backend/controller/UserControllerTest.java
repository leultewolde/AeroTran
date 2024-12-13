package edu.miu.cs425.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.miu.cs425.backend.dto.request.LoginRequest;
import edu.miu.cs425.backend.dto.request.RegisterRequest;
import edu.miu.cs425.backend.dto.request.UserRequest;
import edu.miu.cs425.backend.dto.response.AuthResponse;
import edu.miu.cs425.backend.dto.response.UserResponse;
import edu.miu.cs425.backend.model.Role;
import edu.miu.cs425.backend.service.UserService;
import edu.miu.cs425.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void register() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setName("Durin");
        registerRequest.setAge(60);
        registerRequest.setPhone("3475179885");
        registerRequest.setEmail("durin@lotr.com");
        registerRequest.setPassword("durin1234");
        registerRequest.setRole(Role.REGULAR);

        AuthResponse authResponse = new AuthResponse("token123");

        when(userService.createUser(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest))
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("token123"));

        verify(userService, times(1)).createUser(any(RegisterRequest.class));
    }

    @Test
    void login() throws Exception{
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("durin@lotr.com");
        loginRequest.setPassword("durin1234");

        AuthResponse authResponse = new AuthResponse("token123");

        when(userService.loginUser(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token123"));

        verify(userService, times(1)).loginUser(any(LoginRequest.class));
    }

    @Test
    void getAllUsers() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(1L);
        userResponse.setName("Durin");
        userResponse.setAge(60);
        userResponse.setPhone("3475179885");
        userResponse.setEmail("durin@lotr.com");
        userResponse.setRole(Role.REGULAR);
        userResponse.setCreatedDate(ZonedDateTime.now());
        userResponse.setUpdatedDate(ZonedDateTime.now());

        List<UserResponse> users = List.of(userResponse);

        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Durin"))
                .andExpect(jsonPath("$[0].age").value(60))
                .andExpect(jsonPath("$[0].phone").value("3475179885"))
                .andExpect(jsonPath("$[0].email").value("durin@lotr.com"))
                .andExpect(jsonPath("$[0].role").value("REGULAR"));

        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void getUserById() throws Exception {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(1L);
        userResponse.setName("Durin");
        userResponse.setAge(60);
        userResponse.setPhone("3475179885");
        userResponse.setEmail("durin@lotr.com");
        userResponse.setRole(Role.REGULAR);
        userResponse.setCreatedDate(ZonedDateTime.now());
        userResponse.setUpdatedDate(ZonedDateTime.now());

        when(userService.getUserById(anyLong())).thenReturn(Optional.of(userResponse));

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Durin"))
                .andExpect(jsonPath("$.age").value(60))
                .andExpect(jsonPath("$.phone").value("3475179885"))
                .andExpect(jsonPath("$.email").value("durin@lotr.com"))
                .andExpect(jsonPath("$.role").value("REGULAR"));

        verify(userService, times(1)).getUserById(anyLong());
    }

    @Test
    void updateUser() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setName("King Durin");
        userRequest.setAge(60);
        userRequest.setPhone("3475179005");
        userRequest.setEmail("durin@lotr.movie");
        userRequest.setCreditCardId(123);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(1L);
        userResponse.setName("King Durin");
        userResponse.setAge(60);
        userResponse.setPhone("3475179005");
        userResponse.setEmail("durin@lotr.movie");
        userResponse.setRole(Role.ADMIN);
        userResponse.setCreatedDate(ZonedDateTime.now());
        userResponse.setUpdatedDate(ZonedDateTime.now());

        when(userService.updateUser(anyLong(), any(UserRequest.class))).thenReturn(Optional.of(userResponse));

        mockMvc.perform(put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userRequest))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("King Durin"))
                .andExpect(jsonPath("$.age").value(60))
                .andExpect(jsonPath("$.phone").value("3475179005"))
                .andExpect(jsonPath("$.email").value("durin@lotr.movie"))
                .andExpect(jsonPath("$.role").value("ADMIN"));

        verify(userService, times(1)).updateUser(anyLong(), any(UserRequest.class));
    }

    @Test
    void deleteUser() throws Exception {
        when(userService.deleteUser(anyLong())).thenReturn(true);

        mockMvc.perform(delete("/users/1"))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUser(anyLong());
    }
}