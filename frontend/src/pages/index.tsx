import React, {useState} from 'react';
import {Autocomplete, Box, Button, TextField, Typography,Paper} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useRouter} from "next/router";

function Index() {
    const [departure, setDeparture] = useState<string | null>(null);
    const [arrival, setArrival] = useState<string | null>(null);
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

    const handleSearch = () => {
        if (!departure || !arrival) {
            setError(true);
            return;
        }
        setError(false);

        router.push({
            pathname: '/flights',
            query: { departure, arrival },
        });
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 4,
                maxWidth: 600,
                margin: 'auto',
                marginTop: 4,
                borderRadius: 2,
            }}
        >
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Flights
                </Typography>
                <Typography variant="subtitle1">
                    Find your flights quickly and easily.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Autocomplete
                        options={cities}
                        value={departure}
                        onChange={(event, newValue) => setDeparture(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Departure City"
                                variant="outlined"
                                error={error && !departure}
                                helperText={error && !departure ? 'Please select a departure city' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid size={12}>
                    <Autocomplete
                        options={cities}
                        value={arrival}
                        onChange={(event, newValue) => setArrival(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Arrival City"
                                variant="outlined"
                                error={error && !arrival}
                                helperText={error && !arrival ? 'Please select an arrival city' : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid size={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSearch}
                    >
                        Search Flights
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Index;
