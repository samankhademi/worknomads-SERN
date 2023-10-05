import {http} from "@/queries/http/instance";
import {LoginRequest, LoginResponse} from "./types";

export const loginRequest = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    try {
        return await http({
            method: "POST",
            url: `/auth`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
