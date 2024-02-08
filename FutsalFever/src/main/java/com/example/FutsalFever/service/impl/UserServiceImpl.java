package com.example.FutsalFever.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.UserPojo;
import com.example.FutsalFever.repository.UserRepository;
import com.example.FutsalFever.service.UserService;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public void saveUser(UserPojo userPojo) {

        User user = new User();

        if(userPojo.getId()!=null){
            user=userRepository.findById(userPojo.getId())
                    .orElseThrow(()-> new NoSuchElementException("No data found"));
        }

        user.setFullName(userPojo.getFullName());
        user.setUserName(userPojo.getUserName());
        user.setPassword(userPojo.getPassword());
        user.setAddress(userPojo.getAddress());


        userRepository.save(user);
    }

    @Override
    public List<User> getAllData() {
        return userRepository.findAll(); // select * from users
    }

    @Override
    public Optional<User> getById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
