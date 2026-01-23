package com.substring.auth.auth_app_backend.auth.controllers;

import com.substring.auth.auth_app_backend.auth.config.AppConstant;
import com.substring.auth.auth_app_backend.auth.payload.UserDto;
import com.substring.auth.auth_app_backend.auth.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
    }

    @GetMapping
    public ResponseEntity<Iterable<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    //delete user
    //api/v1/users/{userId}
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") String userId) {
        userService.deleteUser(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable String userId) {
        return ResponseEntity.ok(userService.updateUser(userDto, userId));
    }

    //get user by id
    //api/v1/users/{userId}
    @PreAuthorize("hasRole('" + AppConstant.ADMIN_ROLE + "')")
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
}
