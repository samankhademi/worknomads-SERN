import { http } from "@/queries/http/instance";
import {UsersResponse} from "./types";

export const userListRequest = async (filterQuery:string): Promise<UsersResponse> => {
    try {
        return await http({
            method: "GET",
            url: `/users?${filterQuery}`,
        });
    } catch (error) {
        throw error;
    }
};
