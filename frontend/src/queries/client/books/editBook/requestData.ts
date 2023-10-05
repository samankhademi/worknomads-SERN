import {http} from "@/queries/http/instance";
import { EditBookRequestType, EditBookResponseType } from "./types";

export const editBookRequest = async (
    data: EditBookRequestType,
    id?: number,
): Promise<EditBookResponseType> => {
    try {
        return await http({
            method: "PATCH",
            url: `/books/${id}`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
