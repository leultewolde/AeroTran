package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            existing.setName(user.getName());
            existing.setAge(user.getAge());
            existing.setPhone(user.getPhone());
            existing.setCreditCardId(user.getCreditCardId());
            return userRepository.save(existing);
        });
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
