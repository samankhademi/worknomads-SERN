import {http} from "@/queries/http/instance";
import { DeleteUserResponseType } from "./types";

export const deleteUserRequest = async (
    id?: number,
): Promise<DeleteUserResponseType> => {
    try {
        return await http({
            method: "DELETE",
            url: `/books/${id}`,
        });
    } catch (error) {
        throw error;
    }
};
