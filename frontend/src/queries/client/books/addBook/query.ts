import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { addBookRequest } from "@/queries";
import { AddBookRequestType } from "./types";

export const useAddBookRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.bookAdd,
        mutationFn: (data: AddBookRequestType) => {
            return addBookRequest(data);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.bookList)
        }
    });
};
