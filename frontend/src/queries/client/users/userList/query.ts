import { useQuery } from "@tanstack/react-query";
import { userListRequest } from "./request";
import {keys} from "@/queries/client/keys";
import {UsersListWithFilter} from "@/queries";


export const useUserList = (filter: UsersListWithFilter) => {
    const filterQuery = new URLSearchParams(filter as {}).toString()

    return useQuery({
        queryKey: [keys.usersList],
        queryFn: () => userListRequest(filterQuery),
        enabled: true,
        queryHash: filterQuery,
        keepPreviousData: true
    });
};
