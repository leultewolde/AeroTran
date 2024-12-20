import api from "@/utils/api";
import {RegisterRequest, LoginRequest, AuthResponse} from "@/types/api/users";

export async function registerUser(registerRequest: RegisterRequest): Promise<AuthResponse> {
    const {data} = await api.post<AuthResponse>("/users", registerRequest);
    return data;
}

export async function loginUser(loginRequest: LoginRequest): Promise<AuthResponse> {
    const {data} = await api.post<AuthResponse>("/login", loginRequest);
    return data;
}