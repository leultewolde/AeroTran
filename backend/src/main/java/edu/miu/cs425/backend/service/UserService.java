package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.dto.request.LoginRequest;
import edu.miu.cs425.backend.dto.request.RegisterRequest;
import edu.miu.cs425.backend.dto.request.UserRequest;
import edu.miu.cs425.backend.dto.response.AuthResponse;
import edu.miu.cs425.backend.dto.response.UserResponse;
import edu.miu.cs425.backend.exception.UserAlreadyExistsException;
import edu.miu.cs425.backend.exception.UserNotFoundException;
import edu.miu.cs425.backend.mapper.UserMapper;
import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.UserRepository;
import edu.miu.cs425.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper mapper;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthResponse createUser(RegisterRequest request) {
        User newUser = mapper.toEntity(request);
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        Optional<User> existingUserByEmail = userRepository.findUserByEmail(newUser.getEmail());
        if (existingUserByEmail.isPresent())
            throw new UserAlreadyExistsException("User with email '" + newUser.getEmail() + "' already exists!");

        User savedUser = userRepository.save(newUser);

        String accessToken = jwtUtil.generateAccessToken(savedUser);

        return new AuthResponse(accessToken);
    }

    public AuthResponse loginUser(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

//        var user = userDetailsService.loadUserByUsername(request.getEmail());
        User user = userRepository.findUserByEmail(request.getEmail()).orElseThrow(()-> new UserNotFoundException("User with email '" + request.getEmail() +"' not found"));

        String accessToken = jwtUtil.generateAccessToken(user);

        return new AuthResponse(accessToken);
    }

    public List<UserResponse> getAllUsers() {
        return mapper.toDto(userRepository.findAll());
    }

    public Optional<UserResponse> getUserById(Long id) {
        Optional<User> found = userRepository.findById(id);
        return found.map(mapper::toDto);
    }

    public Optional<UserResponse> updateUser(Long id, UserRequest user) {
        Optional<User> found = userRepository.findById(id);
        if (found.isPresent()) {
            User existing = found.get();
            existing.setName(user.getName());
            existing.setAge(user.getAge());
            existing.setPhone(user.getPhone());
            existing.setCreditCardId(user.getCreditCardId());
            return Optional.of(mapper.toDto(userRepository.save(existing)));
        }
        return Optional.empty();
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
