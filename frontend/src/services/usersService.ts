import apiClient from "@/services/apiClient";
import {UserRequest, UserResponse} from "@/types/api/users";

export const getUsers = async (): Promise<UserResponse[]> => {
    const {data} = await apiClient.get<UserResponse[]>('/products');
    return data;
};

export const getUserById = async (id: number): Promise<UserResponse> => {
    const {data} = await apiClient.get<UserResponse>(`users/${id}`);
    return data;
};

export const updateUser = async (id: number, user: UserRequest): Promise<UserResponse> => {
    const {data} = await apiClient.put<UserResponse>(`users/${id}`, user);
    return data;
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`users/${id}`);
        return;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
