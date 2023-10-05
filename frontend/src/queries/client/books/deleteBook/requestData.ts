import {http} from "@/queries/http/instance";
import { DeleteBookResponseType } from "./types";

export const deleteBookRequest = async (
    id?: number,
): Promise<DeleteBookResponseType> => {
    try {
        return await http({
            method: "DELETE",
            url: `/books/${id}`,
        });
    } catch (error) {
        throw error;
    }
};
