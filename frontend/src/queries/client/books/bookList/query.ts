import { useQuery } from "@tanstack/react-query";
import { booksListRequest } from "./request";
import {keys} from "@/queries/client/keys";
import {BookListWithFilter} from "@/queries";


export const useBooksList = (filter: Partial<BookListWithFilter> = { page: 0, take: 10 }) => {
    const filterQuery = new URLSearchParams(filter as {}).toString()

    return useQuery({
        queryKey: [keys.bookList],
        queryFn: () => booksListRequest(filterQuery),
        enabled: true,
        queryHash: filterQuery,
        keepPreviousData: true
    });
};
