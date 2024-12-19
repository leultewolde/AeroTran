import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Box, Button, TextField, Typography} from '@mui/material';
import {registerUser} from "@/services/authService";
import {Role} from "@/types/api/users";
import {setToken} from "@/utils/tokenService";
import {useRouter} from "next/router";

function calculateAge(birthDateString: Date): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred this year
    const hasHadBirthday =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthday) {
        age--;
    }

    return age;
}

function subtractYears(years:number):string {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - years);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(newDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

interface FormValues {
    name: string;
    dob: string;
    phone: string;
    email: string;
    password: string;
}

export default function Register() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const {token} = await registerUser({
                name: data.name,
                age: calculateAge(new Date(data.dob)),
                phone: data.phone,
                role: Role.REGULAR,
                email: data.email,
                password: data.password
            });
            setToken(token);
            await router.replace('/');
        } catch (error: any) {
            alert(`Signup failed: ${error.response?.data?.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{maxWidth: 400, mx: 'auto', mt: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Signup
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    fullWidth
                    {...register('name', {required: 'Name is required'})}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{mb: 2}}
                />
                <Controller
                    name="dob"
                    control={control}
                    defaultValue={subtractYears(20)}
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Date of Birth"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            sx={{mb: 2}}
                        />
                    )}
                />
                {/*<TextField*/}
                {/*    label="Date of Birth"*/}
                {/*    fullWidth*/}
                {/*    type="date"*/}
                {/*    {...register('dob', {required: 'Date of Birth is required'})}*/}
                {/*    error={!!errors.dob}*/}
                {/*    helperText={errors.dob?.message}*/}
                {/*    sx={{mb: 2}}*/}
                {/*/>*/}
                <TextField
                    label="Phone"
                    fullWidth
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{mb: 2}}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register('email', {required: 'Email is required'})}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{mb: 2}}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register('password', {required: 'Password is required'})}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{mb: 2}}
                />
                <Button type="submit" variant="contained" fullWidth>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>
        </Box>
    );
}