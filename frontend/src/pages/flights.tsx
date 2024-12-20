import React, {useEffect, useState} from 'react';

import FlightCard from "@/components/FlightCard/FlightCard";
import {FlightAPI} from "@/lib/api/FlightAPI";
import {Flight} from "@/types";
import {useRouter} from "next/router";
import SearchBar from "@/components/SearchBar";

const setValue = (value: string | string[] | undefined): string | null =>
    value ? value.toString() : null;

function Flights() {
    const router = useRouter();

    const [flights, setFlights] = useState<Flight[]>([]);

    const [departure, setDeparture] = useState<string | null>(
        setValue(router.query.departure)
    );
    const [arrival, setArrival] = useState<string | null>(
        setValue(router.query.arrival)
    );

    useEffect(() => {
        // Update departure and arrival from query params
        const queryDeparture = setValue(router.query.departure);
        const queryArrival = setValue(router.query.arrival);
        if (queryDeparture !== departure) setDeparture(queryDeparture);
        if (queryArrival !== arrival) setArrival(queryArrival);
    }, [router.query.departure, router.query.arrival]);

    useEffect(() => {
        // Search flights when both departure and arrival are available
        if (departure && arrival) {
            searchFlights(departure, arrival);
        } else {
            fetchAllFlights();
        }
    }, [departure, arrival]);

    const handleChildClick = async (departure1 = "", arrival1 = "") => {
        // console.log('Button clicked in child component!');
        // Add your logic here
        // setDeparture(router.query.departure as string);
        // setArrival(router.query.arrival as string);
        // await searchFlights(departure1 as string, arrival1 as string);
    };

    // useEffect(() => {
    //     console.log({ departure, arrival });
    //     if (!router.query.departure || !router.query.arrival) {
    //         console.log('departure not found');
    //         const fetchData = async () => {
    //             await fetchAllFlights();
    //         };
    //
    //         fetchData();
    //     } else {
    //         console.log('searching')
    //         const searchData = async () => {
    //             await searchFlights(departure as string, arrival as string);
    //         };
    //
    //         searchData();
    //     }
    //     //
    //
    // }, []); // Add dependency array as needed


    const flightData = {
        flightId: 1,
        flightNumber: "FL1234",
        departureCity: "New York",
        destinationCity: "Los Angeles",
        departureTime: "2024-12-20T10:00:00",
        arrivalTime: "2024-12-20T14:00:00",
        status: "ACTIVE",
        seats: [
            {seatId: 1, seatNumber: "1A", available: false},
            {seatId: 2, seatNumber: "1B", available: false},
            {seatId: 3, seatNumber: "1C", available: true},
            {seatId: 4, seatNumber: "2A", available: true},
            {seatId: 5, seatNumber: "2B", available: true},
        ],
    };

    async function fetchAllFlights() {
        try {
            const flights = await FlightAPI.getAllFlights();
            setFlights(flights);
            console.log('All flights:', flights);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    async function searchFlights(departureCity: string, arrivalCity: string) {
        try {
            const flights = await FlightAPI.searchFlights(departureCity, arrivalCity);
            setFlights(flights);
            console.log('Searched flights:', flights);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }


    return (
        <div className="flex flex-no-wrap bg-slate-50">
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <SearchBar departureCity={departure} arrivalCity={arrival} onButtonClick={handleChildClick}/>
                <div className="flex flex-wrap gap-4 p-4">
                    {flights.length > 0 ? (
                        flights.map((flightData) => (
                            <FlightCard key={flightData.id} flight={flightData}/>
                        ))
                    ) : (
                        <p>No flights found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Flights;