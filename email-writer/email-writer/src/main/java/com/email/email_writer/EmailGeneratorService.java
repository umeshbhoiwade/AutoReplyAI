package com.email.email_writer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {
    private final WebClient webClient;
    private final String apiKey;
    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                 @Value("${gemini.api.url}") String baseUrl,
                                 @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = geminiApiKey;
    }




    public String generateEmailReply(EmailRequest emailRequest) {
        //prompt
        String prompt=buildprompt(emailRequest);
        // raw json body
        String requestbody=String.format("""
                {
                    "contents": [
                      {
                        "parts": [
                          {
                            "text": "%s"
                          }
                        ]
                      }
                    ]
                  }
                """,prompt);
        //send request
        String response= webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-2.5-flash:generateContent")
                        .build())
                .header("x-goog-api-key",apiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestbody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        //extract response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {

            ObjectMapper mapper =new ObjectMapper();
            JsonNode root=mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();


    }

    private String buildprompt(EmailRequest emailRequest) {
        StringBuilder prompt=new StringBuilder();
        prompt.append("Generate a professional email reply for the following email:");
        if(emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()){
           prompt.append("Use a ").append(emailRequest.getTone()).append("tone.");

        }
        prompt.append("Original Email: \n").append(emailRequest.getEmailcontent());
        return prompt.toString();

    }
}
