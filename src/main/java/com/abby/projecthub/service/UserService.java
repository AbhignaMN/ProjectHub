package com.abby.projecthub.service;

import com.abby.projecthub.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.abby.projecthub.entity.User;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
