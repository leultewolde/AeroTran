import React, {useEffect, useState} from 'react';

import lastOrdersData from '@/data/lastOrders';
import SideBar from '@/components/SideBar';
import FlightCard from "@/components/FlightCard/FlightCard";
import {FlightAPI} from "@/lib/api/FlightAPI";
import {Flight} from "../../AeroTran/src/types";
import {useRouter} from "next/router";
import Index from "@/pages/index";

function Flights() {
    const [lastOrders] = useState([...lastOrdersData]);
    const [flights, setFlights] = useState<Flight[]>([]);

    const router = useRouter();
    const [departure, setDeparture] = useState<string | null>(null);
    const [arrival, setArrival] = useState<string | null>(null);

    useEffect(() => {
        if (router.query) {
            if (router.query.departure) setDeparture(router.query.departure as string);
            if (router.query.arrival) setArrival(router.query.arrival as string);
        }
    }, [router]);

    useEffect(() => {
        console.log({ departure, arrival });
        if (!arrival || !departure) {
            console.log('departure not found');
            const fetchData = async () => {
                await fetchAllFlights();
            };

            fetchData();
        } else {
            console.log('searching')
            const searchData = async () => {
                await searchFlights(departure, arrival);
            };

            searchData();
        }
        //

    }, []); // Add dependency array as needed


    const flightData = {
        flightId: 1,
        flightNumber: "FL1234",
        departureCity: "New York",
        destinationCity: "Los Angeles",
        departureTime: "2024-12-20T10:00:00",
        arrivalTime: "2024-12-20T14:00:00",
        status: "ACTIVE",
        seats: [
            { seatId: 1, seatNumber: "1A", available: false },
            { seatId: 2, seatNumber: "1B", available: false },
            { seatId: 3, seatNumber: "1C", available: true },
            { seatId: 4, seatNumber: "2A", available: true },
            { seatId: 5, seatNumber: "2B", available: true },
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

    async function searchFlights(departureCity:string,arrivalCity:string) {
        try {
            const flights = await FlightAPI.searchFlights(departureCity,arrivalCity);
            setFlights(flights);

            console.log('Searched flights:', flights);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }



    return (
        <div className="flex flex-no-wrap bg-slate-50">
            <SideBar />

            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <Index departure={departure} arrival={arrival}/>
                <div className="flex flex-wrap gap-4 p-4">
                    {flights.map((flightData: Flight) => (
                        <FlightCard key={flightData.id} flight={flightData}/>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Flights;