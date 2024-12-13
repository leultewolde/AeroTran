package edu.miu.cs425.backend;

import com.jayway.jsonpath.JsonPath;
import edu.miu.cs425.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    private String jwtToken;
    private Integer createdUserId;

    @BeforeEach
    void setUp() throws Exception {
        // Register a new user (no authentication needed)
        String registerJson = """
                {
                    "name":"John Doe",
                    "age":30,
                    "phone":"1234567890",
                    "role":"REGULAR",
                    "email":"john@example.com",
                    "password":"password123"
                }
                """;

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(status().isCreated());

        // Login with the newly registered user (no authentication needed)
        String loginJson = """
                {
                    "email":"john@example.com",
                    "password":"password123"
                }
                """;

        String loginResponse = mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Extract the token from the JSON response: {"token":"<JWT>"}
        jwtToken = JsonPath.read(loginResponse, "$.token");

        String usersList = mockMvc.perform(get("/users")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        createdUserId = JsonPath.read(usersList, "$.[0].id");
    }

    @Test
    void testRegisterUser_publicAccess() throws Exception {
        String newUserJson = """
                {
                    "name":"Jane Doe",
                    "age":25,
                    "phone":"0987654321",
                    "role":"REGULAR",
                    "email":"jane@example.com",
                    "password":"password456"
                }
                """;

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newUserJson))
                .andExpect(status().isCreated()); // Should be allowed without authentication
    }

    @Test
    void testLoginUser_publicAccess() throws Exception {
        String loginJson = """
                {
                    "email":"john@example.com",
                    "password":"password123"
                }
                """;

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk()); // Should be allowed without authentication
    }

    @Test
    void testGetAllUsers_requiresAuth_noToken() throws Exception {
        mockMvc.perform(get("/users"))
                .andExpect(status().isForbidden()); // No token provided, should be forbidden
    }

    @Test
    void testGetAllUsers_withToken() throws Exception {
        mockMvc.perform(get("/users")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk()); // With valid token, should succeed
    }

    @Test
    void testGetUserById_noToken_forbidden() throws Exception {
        mockMvc.perform(get("/users/" + createdUserId))
                .andExpect(status().isForbidden()); // Protected, no token
    }

    @Test
    void testGetUserById_withToken() throws Exception {
        mockMvc.perform(get("/users/" + createdUserId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk()); // Protected, token present
    }

    @Test
    void updateUser_withValidToken_shouldReturnOk() throws Exception {
        // 2. Prepare an update JSON
        String updateJson = """
            {
                "name":"John Doe Updated",
                "age":35,
                "phone":"0987654321",
                "email":"john_updated@example.com",
                "creditCardId":123
            }
            """;

        // 3. Perform update with valid token
        mockMvc.perform(put("/users/" + createdUserId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk());
    }

    @Test
    void updateUser_noToken_shouldReturnForbidden() throws Exception {
        String updateJson = """
            {
                "name":"John Doe Updated",
                "age":35,
                "phone":"0987654321",
                "email":"john_updated@example.com",
                "creditCardId":123
            }
            """;

        // Attempt update without a token
        mockMvc.perform(put("/users/" + createdUserId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isForbidden());
    }

    @Test
    void updateUser_userNotFound_shouldReturnNotFound() throws Exception {
        // 9999 is a user ID that presumably doesn't exist
        String updateJson = """
            {
                "name":"Non-existent User",
                "age":40,
                "phone":"0000000000",
                "email":"noone@example.com",
                "creditCardId":999
            }
            """;

        mockMvc.perform(put("/users/9999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteUser_withValidToken_shouldReturnOk() throws Exception {
        mockMvc.perform(delete("/users/" + createdUserId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk());
    }

    @Test
    void deleteUser_noToken_shouldReturnForbidden() throws Exception {
        mockMvc.perform(delete("/users/" + createdUserId))
                .andExpect(status().isForbidden());
    }

    @Test
    void deleteUser_userNotFound_shouldReturnNotFound() throws Exception {
        // Delete a non-existent user
        mockMvc.perform(delete("/users/9999")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound());
    }
}
