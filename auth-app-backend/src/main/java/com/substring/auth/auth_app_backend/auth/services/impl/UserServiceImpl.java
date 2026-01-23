package com.substring.auth.auth_app_backend.auth.services.impl;

import com.substring.auth.auth_app_backend.auth.config.AppConstant;
import com.substring.auth.auth_app_backend.auth.payload.UserDto;
import com.substring.auth.auth_app_backend.auth.entities.Provider;
import com.substring.auth.auth_app_backend.auth.entities.Role;
import com.substring.auth.auth_app_backend.auth.entities.User;
import com.substring.auth.auth_app_backend.exceptions.ResourceNotFoundException;
import com.substring.auth.auth_app_backend.auth.helpers.UserHelper;
import com.substring.auth.auth_app_backend.auth.repositories.RoleRepository;
import com.substring.auth.auth_app_backend.auth.repositories.UserRepository;
import com.substring.auth.auth_app_backend.auth.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {

        if (userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("User with given email already exists");
        }

        //if you have extra checks... put here
        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);

        //role assign here to user ___ for authorization
        //TODO
        //assign the default role
//        Role role = roleRepository.findByName("ROLE_"+ AppConstant.GUEST_ROLE).orElse(null);
        Role role = roleRepository.findByName("ROLE_"+ AppConstant.ADMIN_ROLE).orElse(null);
        user.getRoles().add(role);

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given emailId"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User existingUser = userRepository
                .findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given userId"));

        if (userDto.getName()!=null)existingUser.setName(userDto.getName());
        if (userDto.getImage()!=null)existingUser.setImage(userDto.getImage());
        if (userDto.getProvider()!=null)existingUser.setProvider(userDto.getProvider());
        //TODO: change password update logic...
        if (userDto.getPassword()!=null)existingUser.setPassword(userDto.getPassword());
        existingUser.setEnable(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException("User not found with given userId"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException("User not found with given userId"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository
                .findAll().
                stream().
                map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }
}
