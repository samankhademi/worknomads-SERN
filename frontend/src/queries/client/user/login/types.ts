import {UseMutationOptions} from "@tanstack/react-query";
import {HttpResponse} from "@/queries/http";

export type LoginRequest = {
    email: string
    password: string
};

export interface LoginResponse extends HttpResponse{
    message: {
        token: string,
        user: {
            id: number
            firstName: string
            lastName: string
            email: string
            role: "ADMIN" | "USER",
            createdAt: Date
        }
    }
}

export type UseLogin = Omit<UseMutationOptions, "mutationFn" | "mutationKey">;
