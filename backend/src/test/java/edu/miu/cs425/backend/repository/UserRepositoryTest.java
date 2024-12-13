package edu.miu.cs425.backend.repository;

import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.model.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveUser() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);

        // Act
        User savedUser = userRepository.save(user);

        // Assert
        assertNotNull(savedUser.getId());
        assertEquals("test", savedUser.getName());
        assertEquals(60, savedUser.getAge());
        assertEquals("1234567890", savedUser.getPhone());
        assertEquals("testuser@example.com", savedUser.getEmail());
        assertEquals("password1234", savedUser.getPassword());
        assertEquals(Role.ADMIN, savedUser.getRole());
        assertNotNull(savedUser.getCreatedDate());
        assertNotNull(savedUser.getUpdatedDate());
    }

    @Test
    void testFindUserByEmail_UserFound() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser1@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);
        entityManager.persistAndFlush(user);

        // Act
        Optional<User> foundUser = userRepository.findUserByEmail("testuser1@example.com");

        // Assert
        assertTrue(foundUser.isPresent());
        assertNotNull(foundUser.get().getId());
        assertEquals("test", foundUser.get().getName());
        assertEquals(60, foundUser.get().getAge());
        assertEquals("1234567890", foundUser.get().getPhone());
        assertEquals("testuser1@example.com", foundUser.get().getEmail());
        assertEquals("password1234", foundUser.get().getPassword());
        assertEquals(Role.ADMIN, foundUser.get().getRole());
        assertNotNull(foundUser.get().getCreatedDate());
        assertNotNull(foundUser.get().getUpdatedDate());
    }

    @Test
    void testFindUserByEmail_UserNotFound() {
        // Act
        Optional<User> foundUser = userRepository.findUserByEmail("unknown.user@example.com");

        // Assert
        assertFalse(foundUser.isPresent());
    }

    @Test
    void testFindUserById_UserFound() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser1@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);
        User savedUser = entityManager.persistAndFlush(user);

        // Act
        Optional<User> foundUser = userRepository.findById(savedUser.getId());

        // Assert
        assertTrue(foundUser.isPresent());
        assertNotNull(foundUser.get().getId());
        assertEquals("test", foundUser.get().getName());
        assertEquals(60, foundUser.get().getAge());
        assertEquals("1234567890", foundUser.get().getPhone());
        assertEquals("testuser1@example.com", foundUser.get().getEmail());
        assertEquals("password1234", foundUser.get().getPassword());
        assertEquals(Role.ADMIN, foundUser.get().getRole());
        assertNotNull(foundUser.get().getCreatedDate());
        assertNotNull(foundUser.get().getUpdatedDate());
    }

    @Test
    void testFindUserById_UserNotFound() {
        // Act
        Optional<User> foundUser = userRepository.findById(123L);

        // Assert
        assertFalse(foundUser.isPresent());
    }

    @Test
    void testFindAllUsers() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser2@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);
        entityManager.persistAndFlush(user);

        // Act
        List<User> users = userRepository.findAll();

        // Assert
        assertNotNull(users);
        assertFalse(users.isEmpty());
        assertNotNull(users.getFirst().getId());
        assertEquals("test", users.getFirst().getName());
        assertEquals(60, users.getFirst().getAge());
        assertEquals("1234567890", users.getFirst().getPhone());
        assertEquals("testuser2@example.com", users.getFirst().getEmail());
        assertEquals("password1234", users.getFirst().getPassword());
        assertEquals(Role.ADMIN, users.getFirst().getRole());
        assertNotNull(users.getFirst().getCreatedDate());
        assertNotNull(users.getFirst().getUpdatedDate());
    }

    @Test
    public void testExistsById_Exists() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser1@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);
        User savedUser = entityManager.persistAndFlush(user);

        // Act
        boolean userExists = userRepository.existsById(savedUser.getId());

        // Assert
        assertTrue(userExists);
    }

    @Test
    public void testExistsById_DoesNotExist() {
        // Act
        boolean userExists = userRepository.existsById(123L);

        // Assert
        assertFalse(userExists);
    }

    @Test
    public void testDeleteUser() {
        // Arrange
        User user = new User();
        user.setName("test");
        user.setAge(60);
        user.setPhone("1234567890");
        user.setEmail("testuser1@example.com");
        user.setPassword("password1234");
        user.setRole(Role.ADMIN);
        User savedUser = entityManager.persistAndFlush(user);


        // Act
        userRepository.deleteById(savedUser.getId());

        boolean userExists = userRepository.existsById(savedUser.getId());

        // Assert
        assertFalse(userExists);
    }
}