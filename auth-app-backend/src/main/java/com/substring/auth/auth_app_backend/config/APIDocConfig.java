package com.substring.auth.auth_app_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Auth Application build by Manish Thokale.",
                description = "Genric auth app that can be used with any application.",
                contact = @Contact(
                        name = "Manish Thokale",
                        url = "https://www.linkedin.com/in/manesh-thokale/",
                        email = "maneshthokale47@gmail.com"
                ),
                version = "1.0",
                summary = "This app very useful if you don't want create auth app from scratch."
        ),
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",  //Authorization: Bearer token
        bearerFormat = "JWT"
)
public class APIDocConfig {


}
