import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import {loginUser} from "@/services/authService";
import {LoginRequest} from "@/types/api/users";
import {setToken} from "@/utils/tokenService";
import {useRouter} from "next/router";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

    function transformQuery(query: { [key: string]: any }): { path: string; params: { [key: string]: string } } {
        const { path = '', ...params } = query;
        return {
            path,
            params,
        };
    }

    const onSubmit = async (data:LoginRequest) => {
        setLoading(true);
        try {
            const {token} = await loginUser(data);
            setToken(token);
            const result = transformQuery(router.query);
            await router.replace({
                pathname: result.path,
                query: result.params
            });
        } catch (error:any) {
            alert(`Sign In failed: ${error.response?.data?.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Email"
                    fullWidth
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>
        </Box>
    );
}