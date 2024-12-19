import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Flights() {
    const router = useRouter();
    const [departure, setDeparture] = useState<string | null>(null);
    const [arrival, setArrival] = useState<string | null>(null);

    useEffect(() => {
        if (router.query) {
            if (router.query.departure) setDeparture(router.query.departure as string);
            if (router.query.arrival) setArrival(router.query.arrival as string);
        }
    }, [router]);

    return (
        <div>
            <h1>flights</h1>
            <p>arrival: {arrival}</p>
            <p>departure: {departure}</p>
        </div>
    );
}