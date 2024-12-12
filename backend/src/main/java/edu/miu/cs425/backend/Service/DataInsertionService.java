package edu.miu.cs425.backend.Service;

import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInsertionService implements CommandLineRunner {


    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        userRepository.saveAll(List.of(
                new User(null, "Alice Johnson", 28, "555-1234", 101),
                new User(null, "Bob Smith", 35, "555-5678", 102),
                new User(null, "Charlie Brown", 42, "555-9101", 103),
                new User(null, "Diana Prince", 30, "555-1122", 104),
                new User(null, "Ethan Hunt", 45, "555-3344", 105),
                new User(null, "Fiona Apple", 25, "555-5566", 106),
                new User(null, "George Lucas", 50, "555-7788", 107),
                new User(null, "Hannah Montana", 22, "555-9900", 108),
                new User(null, "Ian Fleming", 40, "555-2233", 109),
                new User(null, "Julia Roberts", 38, "555-4455", 110)
        ));
    }
}
