import React from "react";
import {Seat, Flight, FlightCardProps} from "@/types"

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
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
                            Seat {seat.seatNumber}: {seat.available ? "Available" : "Booked"}
                        </li>
                    ))}
                </ul>
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
};

export default FlightCard;