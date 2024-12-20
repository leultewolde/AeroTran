package edu.miu.cs425.backend;

import edu.miu.cs425.backend.dto.request.FlightRequestDTO;
import edu.miu.cs425.backend.dto.response.FlightResponseDTO;
import edu.miu.cs425.backend.model.Flight;
import edu.miu.cs425.backend.model.FlightStatus;
import edu.miu.cs425.backend.repository.FlightRepository;
import edu.miu.cs425.backend.util.DataFaker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@RequiredArgsConstructor
public class BackendApplication implements CommandLineRunner {

    private final FlightRepository flightRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Flight> flights = DataFaker.generateFlights(5);
        flightRepository.saveAll(flights);
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
