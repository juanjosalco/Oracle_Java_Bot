package com.talentpentagon.javabot.queryhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.talentpentagon.javabot.service.CustomUserDetailsService;
import com.talentpentagon.javabot.model.CustomUserDTO;

import java.util.List;

@Service
public class GetBlockedUsersHandler implements Query<List<CustomUserDTO>>{
    
    @Autowired
    private CustomUserDetailsService customUserService;

    @Override
    public ResponseEntity<List<CustomUserDTO>> execute() {

        List<CustomUserDTO> blockedUsers = customUserService.getBlockedUsers();

        if(blockedUsers == null || blockedUsers.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(blockedUsers);
    }
}
