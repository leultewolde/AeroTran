import React, { useState } from "react";
import { FlightCardProps } from "@/types";
import {BookingAPI} from "@/lib/api/FlightAPI";
import {useRouter} from "next/router";

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const router = useRouter();

    const handleSeatChange = (seatNumber: string) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatNumber)) {
                return prevSelectedSeats.filter((seat) => seat !== seatNumber);
            } else {
                return [...prevSelectedSeats, seatNumber];
            }
        });
    };

    const handleBooking = async () => {
        // TODO get current login in useer here
        const bookingData = {
            userId: 1,
            flightId: flight.flightId,
            seatNumbers: selectedSeats,
        };

        router.reload();

        try {
            const response = await BookingAPI.createBooking(bookingData);
            if (response) {
                alert("Booking successful!");
                setSelectedSeats([]); // Clear selected seats after successful booking

            } else {
                const errorData = await response;
                alert(`Booking failed: ${errorData}`);
            }
        } catch (error) {
            console.error("Error booking seats:", error);
            alert("An error occurred while booking seats.");
        }
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.header}>Flight: {flight.flightNumber}</h2>
            <div style={styles.info}>
                <p>
                    <strong>From:</strong> {flight.departureCity}
                </p>
                <p>
                    <strong>To:</strong> {flight.destinationCity}
                </p>
                <p>
                    <strong>Departure:</strong>{" "}
                    {new Date(flight.departureTime).toLocaleString()}
                </p>
                <p>
                    <strong>Arrival:</strong>{" "}
                    {new Date(flight.arrivalTime).toLocaleString()}
                </p>
                <p>
                    <strong>Status:</strong> {flight.status}
                </p>
            </div>
            <div style={styles.seats}>
                <h3>Seats</h3>
                <ul style={styles.seatList}>
                    {flight.seats.map((seat) => (
                        <li
                            key={seat.seatId}
                            style={{
                                ...styles.seat,
                                backgroundColor: seat.available ? "#d4edda" : "#f8d7da",
                            }}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    disabled={!seat.available}
                                    checked={selectedSeats.includes(seat.seatNumber)}
                                    onChange={() => handleSeatChange(seat.seatNumber)}
                                />
                                Seat {seat.seatNumber}: {seat.available ? "Available" : "Booked"}
                            </label>
                        </li>
                    ))}
                </ul>
                <button
                    style={styles.bookButton}
                    onClick={handleBooking}
                    disabled={selectedSeats.length === 0}
                >
                    Book Seats
                </button>
            </div>
        </div>
    );
};

// Inline styles for basic styling
const styles: { [key: string]: React.CSSProperties } = {
    card: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        maxWidth: "400px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    header: {
        marginBottom: "8px",
        color: "#333",
    },
    info: {
        marginBottom: "16px",
        color: "#555",
    },
    seats: {
        marginTop: "16px",
    },
    seatList: {
        listStyleType: "none",
        padding: 0,
    },
    seat: {
        padding: "8px",
        margin: "4px 0",
        borderRadius: "4px",
    },
    bookButton: {
        marginTop: "16px",
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default FlightCard;
