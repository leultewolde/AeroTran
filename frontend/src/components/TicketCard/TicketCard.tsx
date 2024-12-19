import React from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import {Ticket, TicketCardProps} from "@/types"

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.header}>Ticket ID: {ticket.ticketId}</h2>
            <div style={styles.info}>
                <p>
                    <strong>User ID:</strong> {ticket.userId}
                </p>
                <p>
                    <strong>Flight ID:</strong> {ticket.flightId}
                </p>
                <p>
                    <strong>Seat Numbers:</strong> {ticket.seatNumbers.join(", ")}
                </p>
            </div>
            <div style={styles.qrCode}>
                {ticket.qrCode ? (
                    <QRCodeGenerator data={ticket.qrCode} />
                ) : (
                    <p>No QR Code available</p>
                )}
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
    qrCode: {
        marginTop: "16px",
        textAlign: "center",
    },
    qrImage: {
        maxWidth: "100%",
        height: "auto",
    },
};

export default TicketCard;
