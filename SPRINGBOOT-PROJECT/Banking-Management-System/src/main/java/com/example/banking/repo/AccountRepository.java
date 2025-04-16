package com.example.banking.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.banking.model.Account;

public interface AccountRepository extends JpaRepository <Account,Long>
{
	List<Account> findByAccountNumber(String accountNumber);
	 Optional<Account> findByUserId(Long userId);
}
