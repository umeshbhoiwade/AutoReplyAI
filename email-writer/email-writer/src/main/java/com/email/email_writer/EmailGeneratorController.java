package com.email.email_writer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
// enablled it for all the origins
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateemail(@RequestBody EmailRequest emailRequest){
        String responce = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(responce );
    }

}
