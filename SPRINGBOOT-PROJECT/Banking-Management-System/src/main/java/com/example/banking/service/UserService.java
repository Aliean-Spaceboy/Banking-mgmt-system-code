package com.example.banking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.banking.exception.ResourceNotFoundException;
import com.example.banking.exception.UserAlreadyExistsException;
import com.example.banking.model.User;
import com.example.banking.repo.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

  

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    // Fetch a user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserAlreadyExistsException("Username '" + user.getUsername() + "' is already taken.");
        }
        return userRepository.save(user);
    }

    // Update an existing user
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword()); // Encode the updated password

        return userRepository.save(user);
    }

    // Delete a user
    @Transactional
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {  // Check if user exists
            userRepository.deleteById(id);
            return true;
        } else {
            return false;  // Return false if user does not exist
        }
    }
}
