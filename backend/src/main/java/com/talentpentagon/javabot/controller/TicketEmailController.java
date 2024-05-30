package com.talentpentagon.javabot.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;
import com.talentpentagon.javabot.service.EmailSenderService;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api/v1")
public class TicketEmailController {

    @Autowired
    private EmailSenderService senderService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/email")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, Object> jsonMap) throws MessagingException {
        try {
            String userEmail = (String) jsonMap.get("userEmail");
            senderService.sendEmail(userEmail);
            return ResponseEntity.ok("Correo enviado exitosamente a " + userEmail);
        } catch (javax.mail.MessagingException e) {
            return ResponseEntity.status(500).body("Error al enviar el correo (Ticket Controller): " + e.getMessage());
        }
    }
}