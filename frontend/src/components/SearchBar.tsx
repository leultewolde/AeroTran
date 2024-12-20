import React, {useState,useEffect} from 'react';
import {Autocomplete, Box, Button, TextField, Typography,Paper} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useRouter} from "next/router";

interface SearchBarProps {
    departureCity?: string | null;
    arrivalCity?: string | null;
    onButtonClick?: (departure: string,arrival: string) => void;
}

function SearchBar({arrivalCity, departureCity, onButtonClick=()=>{}}: SearchBarProps) {
    const [departure, setDeparture] = useState<string | null>(departureCity||null);
    const [arrival, setArrival] = useState<string | null>(arrivalCity||null);
    const [error, setError] = useState(false);
    const router = useRouter();

    const cities = [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Miami',
        'Dallas',
        'Atlanta',
        'San Francisco',
    ];

    useEffect(() => {
        setDeparture(departureCity || null);
    }, [departureCity]);

    useEffect(() => {
        setArrival(arrivalCity || null);
    }, [arrivalCity]);

    const handleSearch = () => {
        if(departure && arrival) {
            setError(false);

            router.push({
                pathname: '/flights',
                query: { departure, arrival },
            }).then(() =>  onButtonClick(departure, arrival));

            return;
        }

        setError(true);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                maxWidth: '100%',
                marginTop: 0,
                borderRadius: 2,
            }}>
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Flights
                </Typography>
                <Typography variant="subtitle1">
                    Find your flights quickly and easily.
                </Typography>
            </Box>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                style={{ width: '100%' }}>
                <Grid size={{xs: 12, sm: 3}}>
                    <Autocomplete
                        options={cities}
                        value={departure}
                        fullWidth
                        onChange={(_, newValue) => setDeparture(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Departure City"
                                variant="outlined"
                                error={error && !departure}
                                helperText={error && !departure ? 'Please select a departure city' : ''}
                                // style={{ width: '250px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 3}}>
                    <Autocomplete
                        options={cities}
                        value={arrival}
                        fullWidth
                        onChange={(_, newValue) => setArrival(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Arrival City"
                                variant="outlined"
                                error={error && !arrival}
                                helperText={error && !arrival ? 'Please select an arrival city' : ''}
                                // style={{ width: '250px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 3}}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSearch}>Search Flights</Button>
                </Grid>
            </Grid>


        </Paper>
    );
}

export default SearchBar;
