import api from "@/utils/api";
import {RegisterRequest, LoginRequest, AuthResponse} from "@/types/api/users";

export async function registerUser(registerRequest: RegisterRequest): Promise<AuthResponse> {
    console.log(registerRequest)
    // const {data} = await api.post<AuthResponse>("/users", registerRequest);
    // return data;
    return new Promise((resolve) => resolve({token: "token123"}));
}

export async function loginUser(loginRequest: LoginRequest): Promise<AuthResponse> {
    // const {data} = await api.post<AuthResponse>("/login", loginRequest);
    // return data;
    return new Promise((resolve) => resolve({token: "token123"}));
}