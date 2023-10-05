import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteUserRequest } from "@/queries";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.usersDelete,
        mutationFn: (id:number) => {
            return deleteUserRequest(id);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.usersList)
        }
    });
};
