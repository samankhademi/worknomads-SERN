import { http } from "@/queries/http/instance";
import {BooksResponse} from "./types";

export const booksListRequest = async (filterQuery:string): Promise<BooksResponse> => {
    try {
        return await http({
            method: "GET",
            url: `/books?${filterQuery}`,
        });
    } catch (error) {
        throw error;
    }
};
