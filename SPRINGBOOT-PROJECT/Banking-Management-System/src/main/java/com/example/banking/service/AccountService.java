package com.example.banking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.banking.exception.ResourceNotFoundException;
import com.example.banking.model.Account;
import com.example.banking.model.User;
import com.example.banking.repo.AccountRepository;
import com.example.banking.repo.UserRepository;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new account
    public Account upsertAccount(Account account) {
        if (account == null) {
            throw new IllegalArgumentException("Account object cannot be null.");
        }

        // Check if User is valid
        if (account.getUser() == null || account.getUser().getId() == null) {
            throw new IllegalArgumentException("User is required and must have a valid ID.");
        }

        // Fetch the User entity to ensure it exists
        User user = userRepository.findById(account.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + account.getUser().getId()));

        // Check if an account already exists for this user
        Optional<Account> existingAccount = accountRepository.findByUserId(user.getId());

        if (existingAccount.isPresent()) {
            Account updatedAccount = existingAccount.get();
            updatedAccount.setFirstName(account.getFirstName());
            updatedAccount.setLastName(account.getLastName());
            updatedAccount.setAccountNumber(account.getAccountNumber());
            updatedAccount.setBalance(account.getBalance());
            updatedAccount.setPhNumber(account.getPhNumber());
            updatedAccount.setEmail(account.getEmail());

            return accountRepository.save(updatedAccount); // Update existing account
        }

        // If no existing account, create a new one
        account.setUser(user);
        return accountRepository.save(account);
    }

    // Fetch all accounts
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Find accounts by account number
    public List<Account> findByAccountNumber(String accountNumber) {
        List<Account> accounts = accountRepository.findByAccountNumber(accountNumber);
        if (accounts.isEmpty()) {
            throw new ResourceNotFoundException("No accounts found for account number: " + accountNumber);
        }
        return accounts;
    }
}
