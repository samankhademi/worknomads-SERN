import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteBookRequest } from "@/queries";

export const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.bookDelete,
        mutationFn: (id:number) => {
            return deleteBookRequest(id);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.bookList)
        }
    });
};
