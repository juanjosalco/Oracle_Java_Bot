package com.talentpentagon.javabot.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;
import com.talentpentagon.javabot.service.EmailSenderService;

@RestController
public class TicketEmailController {

    @Autowired
    private EmailSenderService senderService;

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestParam String userEmail) throws MessagingException {
        try {
            senderService.sendEmail(userEmail);
            return ResponseEntity.ok("Correo enviado exitosamente a " + userEmail);
        } catch (javax.mail.MessagingException e) {
            return ResponseEntity.status(500).body("Error al enviar el correo: " + e.getMessage());
        }
    }
}