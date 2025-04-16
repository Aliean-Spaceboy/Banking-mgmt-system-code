package com.example.banking.exception;
import java.time.LocalDateTime;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.banking.exception.info.ExInfo;

@RestControllerAdvice
public class AppExceptionHandler 
{
	

    // Handle generic exceptions
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExInfo> handleGeneralException(Exception e) {
        ExInfo exInfo = new ExInfo("EX797979", e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(exInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle resource not found exceptions
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<ExInfo> handleResourceNotFoundException(ResourceNotFoundException e) {
        ExInfo exInfo = new ExInfo("EX404", e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(exInfo, HttpStatus.NOT_FOUND);
    }

    // Handle user already exists exception
    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<ExInfo> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        ExInfo exInfo = new ExInfo("EX409", e.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(exInfo, HttpStatus.CONFLICT);
    }

}
