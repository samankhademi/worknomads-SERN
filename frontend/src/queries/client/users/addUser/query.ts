import { keys } from "@/queries/client/keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { addUsersRequest } from "@/queries";
import { AddUserRequestType } from "./types";

export const useAddUserRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: keys.usersAdd,
        mutationFn: (data: AddUserRequestType) => {
            return addUsersRequest(data);
        },
        onSuccess: () => {
            queryClient.clear()
            queryClient.refetchQueries(keys.usersList)
        }
    });
};
