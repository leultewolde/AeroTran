package edu.miu.cs425.backend.service;

import edu.miu.cs425.backend.dto.request.BookingRequestDTO;
import edu.miu.cs425.backend.dto.response.BookingResponseDTO;
import edu.miu.cs425.backend.model.Flight;
import edu.miu.cs425.backend.model.Seat;
import edu.miu.cs425.backend.model.Ticket;
import edu.miu.cs425.backend.model.User;
import edu.miu.cs425.backend.repository.FlightRepository;
import edu.miu.cs425.backend.repository.SeatRepository;
import edu.miu.cs425.backend.repository.TicketRepository;
import edu.miu.cs425.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final TicketRepository ticketRepository;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;

    public BookingResponseDTO bookFlight(BookingRequestDTO bookingRequestDTO) {
        User user = userRepository.findById(bookingRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Flight flight = flightRepository.findById(bookingRequestDTO.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        List<Seat> seats = flight.getSeats().stream()
                .filter(seat -> bookingRequestDTO.getSeatNumbers().contains(seat.getSeatNumber()) && seat.isAvailable())
                .collect(Collectors.toList());

        if (seats.size() != bookingRequestDTO.getSeatNumbers().size()) {
            throw new RuntimeException("Some seats are unavailable");
        }

        // Mark seats as booked
        seats.forEach(seat -> seat.setAvailable(false));
        seatRepository.saveAll(seats);

        // Create ticket
        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setFlight(flight);
        ticket.setSeatIds(seats.stream().map(seat -> seat.getSeatId().toString()).collect(Collectors.toList()));
        ticket.setQrCode(generateQrCode(ticket));

        Ticket savedTicket = ticketRepository.save(ticket);
        return new BookingResponseDTO(savedTicket.getTicketId(), user.getId(), flight.getFlightId(),
                seats.stream().map(Seat::getSeatNumber).collect(Collectors.toList()), savedTicket.getQrCode());
    }

    private byte[] generateQrCode(Ticket ticket) {
        // Placeholder for QR code generation logic
        return ("Ticket#" + ticket.getTicketId()).getBytes(StandardCharsets.UTF_8);
    }
}
