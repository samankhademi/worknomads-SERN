import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { editBookRequest } from "@/queries";
import { EditBookRequestType } from "./types";

export const useEditBookRequest = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.bookEdit,
        mutationFn: (data: EditBookRequestType) => {
            return editBookRequest(data, id);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.bookList)
        }
    });
};
