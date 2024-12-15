package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.dto.SeatDTO;
import edu.miu.cs425.backend.dto.request.FlightRequestDTO;
import edu.miu.cs425.backend.dto.response.FlightResponseDTO;
import edu.miu.cs425.backend.model.Flight;
import edu.miu.cs425.backend.model.Seat;
import edu.miu.cs425.backend.repository.FlightRepository;
import edu.miu.cs425.backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;

    public FlightResponseDTO addFlight(FlightRequestDTO flightRequestDTO) {
        Flight flight = new Flight();
        flight.setFlightNumber(flightRequestDTO.getFlightNumber());
        flight.setDepartureCity(flightRequestDTO.getDepartureCity());
        flight.setDestinationCity(flightRequestDTO.getDestinationCity());
        flight.setDepartureTime(flightRequestDTO.getDepartureTime());
        flight.setArrivalTime(flightRequestDTO.getArrivalTime());
        flight.setStatus(flightRequestDTO.getStatus());

        // Add seats
        List<Seat> seats = flightRequestDTO.getSeatNumbers().stream()
                .map(seatNumber -> new Seat(null, seatNumber, true, flight))
                .collect(Collectors.toList());
        flight.setSeats(seats);

        Flight savedFlight = flightRepository.save(flight);
        return mapToFlightResponseDTO(savedFlight);
    }

    public List<FlightResponseDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::mapToFlightResponseDTO)
                .collect(Collectors.toList());
    }

    public List<FlightResponseDTO> searchFlights(String departureCity, String destinationCity) {
        List<Flight> flights = flightRepository.findByDepartureCityAndDestinationCity(departureCity, destinationCity);
        return flights.stream()
                .map(flight -> new FlightResponseDTO(
                        flight.getFlightId(),
                        flight.getFlightNumber(),
                        flight.getDepartureCity(),
                        flight.getDestinationCity(),
                        flight.getDepartureTime(),
                        flight.getArrivalTime(),
                        flight.getStatus(),
                        flight.getSeats().stream()
                                .map(seat -> new SeatDTO(seat.getSeatId(), seat.getSeatNumber(), seat.isAvailable()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    private FlightResponseDTO mapToFlightResponseDTO(Flight flight) {
        List<SeatDTO> seatDTOs = flight.getSeats().stream()
                .map(seat -> new SeatDTO(seat.getSeatId(), seat.getSeatNumber(), seat.isAvailable()))
                .collect(Collectors.toList());
        return new FlightResponseDTO(
                flight.getFlightId(),
                flight.getFlightNumber(),
                flight.getDepartureCity(),
                flight.getDestinationCity(),
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getStatus(),
                seatDTOs
        );
    }
}