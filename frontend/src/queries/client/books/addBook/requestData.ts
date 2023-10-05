import {http} from "@/queries/http/instance";
import {AddBookRequestType, AddBookResponseType} from "./types";

export const addBookRequest = async (
    data: AddBookRequestType
): Promise<AddBookResponseType> => {
    try {
        return await http({
            method: "POST",
            url: `/books`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
