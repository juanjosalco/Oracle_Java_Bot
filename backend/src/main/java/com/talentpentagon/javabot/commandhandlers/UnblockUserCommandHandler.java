package com.talentpentagon.javabot.commandhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.service.CustomUserDetailsService;
import com.talentpentagon.javabot.Commands.UnblockCommand;

@Service
public class UnblockUserCommandHandler implements UnblockCommand<Integer>  {
    @Autowired
    private CustomUserDetailsService customUserService;

    @Override
    public ResponseEntity<?> execute(Integer id) {
        customUserService.unblockUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
