import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Typography, Chip, Grid } from '@mui/material';
import {FlightAPI} from "@/lib/api/FlightAPI";

interface FormValues {
    flightNumber: string;
    departureCity: string;
    destinationCity: string;
    departureTime: string;
    arrivalTime: string;
    status: string;
    seatNumbers: string[];
}

export default function Create() {
    const [loading, setLoading] = useState(false);
    const [seatNumbers, setSeatNumbers] = useState<string[]>(["1A", "1B", "1C", "2A", "2B"]);

    const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleAddSeat = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        if (event.key === 'Enter' && input.value.trim()) {
            // setSeatNumbers((prev) => [...prev, input.value.trim()]);
            input.value = ''; // Clear the input
            event.preventDefault();
        }
    };

    const handleDeleteSeat = (seat: string) => {
        // setSeatNumbers((prev) => prev.filter((item) => item !== seat));
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                seatNumbers, // Include dynamically managed seat numbers
            };
            await FlightAPI.createFlight(payload); // Replace with actual API call
            alert('Flight created successfully!');
        } catch (error: any) {
            alert(`Failed to create flight: ${error.response?.data?.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Flight
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Flight Number"
                    fullWidth
                    {...register('flightNumber', { required: 'Flight Number is required' })}
                    error={!!errors.flightNumber}
                    helperText={errors.flightNumber?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Departure City"
                    fullWidth
                    {...register('departureCity', { required: 'Departure City is required' })}
                    error={!!errors.departureCity}
                    helperText={errors.departureCity?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Destination City"
                    fullWidth
                    {...register('destinationCity', { required: 'Destination City is required' })}
                    error={!!errors.destinationCity}
                    helperText={errors.destinationCity?.message}
                    sx={{ mb: 2 }}
                />
                <Controller
                    name="departureTime"
                    control={control}
                    rules={{ required: 'Departure Time is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Departure Time"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.departureTime}
                            helperText={errors.departureTime?.message}
                            sx={{ mb: 2 }}
                        />
                    )}
                />
                <Controller
                    name="arrivalTime"
                    control={control}
                    rules={{ required: 'Arrival Time is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Arrival Time"
                            type="datetime-local"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.arrivalTime}
                            helperText={errors.arrivalTime?.message}
                            sx={{ mb: 2 }}
                        />
                    )}
                />
                <TextField
                    label="Status"
                    fullWidth
                    {...register('status', { required: 'Status is required' })}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Add Seat Numbers"
                    fullWidth
                    onKeyDown={handleAddSeat}
                    sx={{ mb: 2 }}
                    placeholder="Press Enter to add a seat"
                />
                <Grid container spacing={1} sx={{ mb: 2 }}>
                    {seatNumbers.map((seat) => (
                        <Grid item key={seat}>
                            <Chip label={seat} onDelete={() => handleDeleteSeat(seat)} />
                        </Grid>
                    ))}
                </Grid>
                <Button type="submit" variant="contained" fullWidth>
                    {loading ? 'Creating...' : 'Create Flight'}
                </Button>
            </form>
        </Box>
    );
}
