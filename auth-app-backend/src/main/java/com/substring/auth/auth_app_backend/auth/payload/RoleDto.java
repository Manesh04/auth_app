package com.substring.auth.auth_app_backend.auth.payload;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private UUID id;
    private String name;
}
