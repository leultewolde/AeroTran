package edu.miu.cs425.backend.util;

import edu.miu.cs425.backend.model.Flight;
import edu.miu.cs425.backend.model.FlightStatus;
import edu.miu.cs425.backend.model.Seat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class DataFaker {

    private static final List<String> cities = Arrays.asList(
            "New York",
            "Los Angeles",
            "Chicago",
            "Houston",
            "Miami",
            "Dallas",
            "Atlanta",
            "San Francisco"
    );

    public static List<Flight> generateFlights(int count) {
        List<Flight> flights = new ArrayList<>();
        Random random = new Random();

        for (int i = 1; i <= count; i++) {
            Flight flight = new Flight();
            flight.setFlightNumber("FL" + (100 + i)); // Generate flight number

            // Randomly select departure and destination cities (ensure they are different)
            String departureCity = cities.get(random.nextInt(cities.size()));
            String destinationCity;
            do {
                destinationCity = cities.get(random.nextInt(cities.size()));
            } while (departureCity.equals(destinationCity));

            flight.setDepartureCity(departureCity);
            flight.setDestinationCity(destinationCity);

            // Set random departure and arrival times
            flight.setDepartureTime(LocalDateTime.now().plusHours(random.nextInt(48))); // Within the next 48 hours
            flight.setArrivalTime(flight.getDepartureTime().plusHours(random.nextInt(5) + 1)); // Duration of 1-5 hours

            // Random status
            FlightStatus status = FlightStatus.values()[random.nextInt(FlightStatus.values().length)];
            flight.setStatus(status);

            // Sample seat numbers
            List<String> seatNumbers = Arrays.asList("1A", "1B", "2A", "2B");
            List<Seat> seats = seatNumbers.stream()
                    .map(seatNumber -> new Seat(null, seatNumber, true, flight))
                    .toList();
            flight.setSeats(seats);

            flights.add(flight);
        }

        return flights;
    }

}
