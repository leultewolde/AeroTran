package edu.miu.cs425.backend.repository;

import edu.miu.cs425.backend.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    // Find flights by departure city and destination city
    List<Flight> findByDepartureCityAndDestinationCity(String departureCity, String destinationCity);
}
