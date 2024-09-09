package com.simplesapi.funcionario.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Applies CORS settings to all endpoints
                        .allowedOrigins("http://localhost:3000") // Allow your Next.js app's origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Methods you want to allow
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials if needed
            }
        };
    }
}
