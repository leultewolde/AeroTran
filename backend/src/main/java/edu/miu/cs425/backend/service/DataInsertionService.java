package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInsertionService implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
// TODO uncomment this code when you want to insert data

//        userRepository.saveAll(List.of(
//                new User(1L, "Alice Johnson", 28, "555-1234", 101),
//                new User(1L, "Bob Smith", 35, "555-5678", 102),
//                new User(1L, "Charlie Brown", 42, "555-9101", 103),
//                new User(1L, "Diana Prince", 30, "555-1122", 104),
//                new User(1L, "Ethan Hunt", 45, "555-3344", 105),
//                new User(1L, "Fiona Apple", 25, "555-5566", 106),
//                new User(1L, "George Lucas", 50, "555-7788", 107),
//                new User(1L, "Hannah Montana", 22, "555-9900", 108),
//                new User(1L, "Ian Fleming", 40, "555-2233", 109),
//                new User(1L, "Julia Roberts", 38, "555-4455", 110)
//        ));
    }
}
