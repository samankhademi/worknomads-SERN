import { keys } from "../../keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "@/queries";
import { LoginRequest } from "./types";
import {storage} from "@/core";

export const useLoginRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: keys.login,
        mutationFn: (data: LoginRequest) => {
                return loginRequest(data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: keys.login,
            });
            storage.jwt.set(data.message.token)
            storage.profile.set(data.message.user)
            return data
        },
    });
};
