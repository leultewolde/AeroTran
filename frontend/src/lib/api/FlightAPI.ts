import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:8080/api/flights';
const BOOKINGS_BASE_URL = 'http://localhost:8080/api/bookings';

// Define TypeScript interfaces for the flight data
interface Flight {
    id?: string; // Optional for create
    flightNumber: string;
    departureCity: string;
    destinationCity: string;
    departureTime: string; // ISO format
    arrivalTime: string; // ISO format
    status: string;
    seatNumbers: string[];
}

interface Booking {
    userId: number;
    flightId: number;
    seatNumbers: string[];
}

// Axios instance for API calls
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const bookingsApi = axios.create({
    baseURL: BOOKINGS_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// CRUD functions
export const FlightAPI = {
    // Create a new flight
    createFlight: async (flight: Flight): Promise<Flight> => {
        const response = await api.post('/', flight);
        return response.data;
    },

    // Get all flights
    getAllFlights: async (): Promise<Flight[]> => {
        const response = await api.get('');
        return response.data;
    },

    // Get a specific flight by ID
    getFlightById: async (id: string): Promise<Flight> => {
        const response = await api.get(`/${id}`);
        return response.data;
    },

    // Update a flight
    updateFlight: async (id: string, flight: Partial<Flight>): Promise<Flight> => {
        const response = await api.put(`/${id}`, flight);
        return response.data;
    },

    // Delete a flight
    deleteFlight: async (id: string): Promise<void> => {
        await api.delete(`/${id}`);
    },

    // Search flights by departure and destination cities
    searchFlights: async (departureCity: string, destinationCity: string): Promise<Flight[]> => {
        const response = await api.get(`/search`, {
            params: { departureCity, destinationCity },
        });
        return response.data;
    },
};

export const BookingAPI = {
    // Create a new booking
    createBooking: async (booking: Booking): Promise<Booking> => {
        const response = await bookingsApi.post('/', booking);
        return response.data;
    },
};

// Example usage
// Import FlightAPI and BookingAPI and call the required methods in your Next.js components or API routes
