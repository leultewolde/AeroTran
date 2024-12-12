package edu.miu.cs425.backend.repository;


import edu.miu.cs425.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
