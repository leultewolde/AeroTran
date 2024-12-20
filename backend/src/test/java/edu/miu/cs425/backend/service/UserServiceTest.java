package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.dto.request.LoginRequest;
import edu.miu.cs425.backend.dto.request.RegisterRequest;
import edu.miu.cs425.backend.dto.request.UserRequest;
import edu.miu.cs425.backend.dto.response.AuthResponse;
import edu.miu.cs425.backend.dto.response.UserResponse;
import edu.miu.cs425.backend.exception.UserAlreadyExistsException;
import edu.miu.cs425.backend.mapper.UserMapper;
import edu.miu.cs425.backend.model.Role;
import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.UserRepository;
import edu.miu.cs425.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper mapper;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Test
    void createUser_userDoesNotExist_savesUserAndReturnsToken() {
        RegisterRequest request = new RegisterRequest();
        request.setName("TestUser");
        request.setAge(60);
        request.setPhone("3475179885");
        request.setEmail("test@example.com");
        request.setPassword("password123");
        request.setRole(Role.REGULAR);

        User userEntity = new User(
                request.getName(),
                request.getAge(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        when(userRepository.findUserByEmail("test@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(mapper.toEntity(request)).thenReturn(userEntity);

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName("TestUser");
        savedUser.setAge(60);
        savedUser.setPhone("3475179885");
        savedUser.setEmail("test@example.com");
        savedUser.setRole(Role.REGULAR);
        savedUser.setPassword("encodedPassword");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtUtil.generateAccessToken(savedUser)).thenReturn("jwtToken");

        AuthResponse response = userService.createUser(request);

        // Verify interactions
        verify(userRepository).save(userCaptor.capture());
        User capturedUser = userCaptor.getValue();
        assertThat(capturedUser.getEmail()).isEqualTo("test@example.com");
        assertThat(capturedUser.getPassword()).isEqualTo("encodedPassword");

        // Verify response
        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwtToken");
    }

    @Test
    void createUser_userAlreadyExists_throwsException() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("duplicate@example.com");
        request.setPassword("password");
        request.setName("DuplicateUser");
        request.setAge(60);
        request.setPhone("3475179885");
        request.setRole(Role.REGULAR);

        User existingUser = new User();
        existingUser.setEmail("duplicate@example.com");

        User newUser = new User();
        newUser.setEmail("duplicate@example.com");
        newUser.setName("DuplicateUser");

        // Now set up mocks properly
        when(mapper.toEntity(request)).thenReturn(newUser);
        when(userRepository.findUserByEmail("duplicate@example.com")).thenReturn(Optional.of(existingUser));

        assertThatThrownBy(() -> userService.createUser(request))
                .isInstanceOf(UserAlreadyExistsException.class)
                .hasMessageContaining("already exists");
    }

    @Test
    void loginUser_validCredentials_returnsToken() {
        LoginRequest request = new LoginRequest();
        request.setEmail("valid@example.com");
        request.setPassword("password");

        User foundUser = new User();
        foundUser.setId(1L);
        foundUser.setRole(Role.REGULAR);

//        org.springframework.security.core.userdetails.UserDetails userDetails =
//                org.springframework.security.core.userdetails.User.withUsername("valid@example.com")
//                        .password("encodedPassword")
//                        .authorities("ROLE_USER")
//                        .build();

        when(userRepository.findUserByEmail("valid@example.com")).thenReturn(Optional.of(foundUser));
        when(jwtUtil.generateAccessToken(foundUser)).thenReturn("jwtToken");

        AuthResponse response = userService.loginUser(request);

        verify(authenticationManager).authenticate(
                new UsernamePasswordAuthenticationToken("valid@example.com", "password"));
        assertThat(response.getToken()).isEqualTo("jwtToken");
    }

    @Test
    void getAllUsers_returnsListOfUserResponses() {
        User user1 = new User();
        user1.setId(1L);
        user1.setName("UserOne");

        User user2 = new User();
        user2.setId(2L);
        user2.setName("UserTwo");

        List<User> userList = List.of(user1, user2);

        UserResponse userResponse1 = new UserResponse();
        userResponse1.setId(1L);
        userResponse1.setName("UserOne");

        UserResponse userResponse2 = new UserResponse();
        userResponse2.setId(2L);
        userResponse2.setName("UserTwo");

        when(userRepository.findAll()).thenReturn(userList);
        when(mapper.toDto(userList)).thenReturn(List.of(userResponse1, userResponse2));

        List<UserResponse> result = userService.getAllUsers();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("UserOne");
        assertThat(result.get(1).getName()).isEqualTo("UserTwo");
    }

    @Test
    void getUserById_userExists_returnsUserResponse() {
        User user = new User();
        user.setId(42L);
        user.setName("Gandalf");
        user.setEmail("gandalf@lotr.com");

        UserResponse userResponse = new UserResponse();
        userResponse.setId(42L);
        userResponse.setName("Gandalf");

        when(userRepository.findById(42L)).thenReturn(Optional.of(user));
        when(mapper.toDto(user)).thenReturn(userResponse);

        Optional<UserResponse> result = userService.getUserById(42L);

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Gandalf");
    }

    @Test
    void getUserById_userDoesNotExist_returnsEmpty() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<UserResponse> result = userService.getUserById(999L);

        assertThat(result).isEmpty();
    }

    @Test
    void updateUser_userExists_updatesAndReturnsUser() {
        UserRequest userRequest = new UserRequest();
        userRequest.setName("UpdatedName");
        userRequest.setAge(30);
        userRequest.setPhone("1234567890");
        userRequest.setCreditCardId(123);

        User existingUser = new User();
        existingUser.setId(50L);
        existingUser.setName("OldName");

        User updatedUser = new User();
        updatedUser.setId(50L);
        updatedUser.setName("UpdatedName");
        updatedUser.setAge(30);
        updatedUser.setPhone("1234567890");
        updatedUser.setCreditCardId(123);

        UserResponse updatedResponse = new UserResponse();
        updatedResponse.setId(50L);
        updatedResponse.setName("UpdatedName");

        when(userRepository.findById(50L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);
        when(mapper.toDto(updatedUser)).thenReturn(updatedResponse);

        Optional<UserResponse> result = userService.updateUser(50L, userRequest);

        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("UpdatedName");
    }

    @Test
    void updateUser_userDoesNotExist_returnsEmpty() {
        UserRequest userRequest = new UserRequest();
        userRequest.setName("SomeName");

        when(userRepository.findById(77L)).thenReturn(Optional.empty());

        Optional<UserResponse> result = userService.updateUser(77L, userRequest);
        assertThat(result).isEmpty();
    }

    @Test
    void deleteUser_userExists_deletesUserAndReturnsTrue() {
        when(userRepository.existsById(100L)).thenReturn(true);

        boolean result = userService.deleteUser(100L);

        assertThat(result).isTrue();
        verify(userRepository, times(1)).deleteById(100L);
    }

    @Test
    void deleteUser_userDoesNotExist_returnsFalse() {
        when(userRepository.existsById(200L)).thenReturn(false);

        boolean result = userService.deleteUser(200L);

        assertThat(result).isFalse();
        verify(userRepository, never()).deleteById(anyLong());
    }
}
