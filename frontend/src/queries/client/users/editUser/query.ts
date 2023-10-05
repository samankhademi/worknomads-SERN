import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { editUserRequest } from "@/queries";
import { EditUserRequestType } from "./types";

export const useEditUserRequest = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.usersEdit,
        mutationFn: (data: EditUserRequestType) => {
            return editUserRequest(data, id);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.usersList)
        }
    });
};
