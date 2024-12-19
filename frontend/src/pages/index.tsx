import React, {useState} from 'react';
import {Autocomplete, Box, Button, TextField, Typography,Paper} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useRouter} from "next/router";

function Index(props: any) {
    const [departure, setDeparture] = useState<string | null>(props.departure);
    const [arrival, setArrival] = useState<string | null>(props.arrival);
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
        }).then(
            () =>  props.onButtonClick(departure, arrival)
        );

    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                maxWidth: '100%',
                // margin: 'auto',
                marginTop: 0,
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
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                style={{ width: '100%' }}
            >
                <Grid item xs={12} sm={3}>
                    <Autocomplete
                        options={cities}
                        value={departure}
                        fullWidth={true}
                        onChange={(event, newValue) => setDeparture(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth={true}
                                label="Departure City"
                                variant="outlined"
                                error={error && !departure}
                                helperText={error && !departure ? 'Please select a departure city' : ''}
                                style={{ width: '250px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Autocomplete
                        options={cities}
                        value={arrival}
                        onChange={(event, newValue) => setArrival(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth={true}
                                label="Arrival City"
                                variant="outlined"
                                error={error && !arrival}
                                helperText={error && !arrival ? 'Please select an arrival city' : ''}
                                style={{ width: '250px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
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
