import {keys} from "@/queries/client/keys";
import {useMutation} from "@tanstack/react-query";
import {changePasswordRequest} from "@/queries";
import {ChangePasswordRequestPayload} from "./types";

export const useChangePassword = () => {
    return useMutation({
        mutationKey: keys.profileSetPassword,
        mutationFn: (data: ChangePasswordRequestPayload) => {
            return changePasswordRequest(data);
        },
        onSuccess: (data) => {
            return data
        },
    });
};
