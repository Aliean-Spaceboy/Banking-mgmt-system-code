package com.example.banking.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.banking.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Check if a user exists by username
    boolean existsByUsername(String username);

    // Find a user by username
    Optional<User> findByUsername(String username);
}
