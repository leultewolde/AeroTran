export enum Role {
    REGULAR = 'REGULAR',
    ADMIN = 'ADMIN',
}

export interface RegisterRequest {
    name: string;
    age: number;
    phone: string;
    role: Role;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserRequest {
    name: string;
    age: number;
    phone: string;
    email: string;
    creditCardId: number;
}

export interface AuthResponse {
    token: string;
}

export interface UserResponse {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    role: Role;
    createdDate: string;
    updatedDate: string;
}