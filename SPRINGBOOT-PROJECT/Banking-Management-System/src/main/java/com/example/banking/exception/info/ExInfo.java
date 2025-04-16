package com.example.banking.exception.info;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@NoArgsConstructor
public class ExInfo
{
	private String exCode;
    private String exMsg;
    private LocalDateTime exDate;

    public ExInfo(String exCode, String exMsg, LocalDateTime exDate) 
    {
        this.exCode = exCode;
        this.exMsg = exMsg;
        this.exDate = exDate;
    }

	

	
}
