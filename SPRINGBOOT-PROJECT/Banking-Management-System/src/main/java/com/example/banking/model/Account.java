package com.example.banking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	
	@Column(name = "firstname" , nullable = false)
	private String firstName;
	
	@Column(name = "lastname" , nullable = false)
	private String lastName;
	
	@Column(name = "account_number", nullable = false, length = 255)
	
	private String accountNumber;
	
	@Column(name = "balance", nullable = false)
	
	private double balance;
	
	@Column(name= "ph-number" ,nullable = false)
	
	private long phNumber;
	
	@Column(name = "email" ,nullable = false)
	
	private String email;
	
	@ManyToOne 
    @JoinColumn(name = "user_id", nullable = false)
	 @JsonBackReference
	private User user;

}
