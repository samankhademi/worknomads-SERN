import { keys } from "../../keys";
import { useMutation } from "@tanstack/react-query";
import { setProfileRequest } from "@/queries";
import { UserProfileRequest } from "./types";

export const useSetProfileRequest = () => {
    return useMutation({
        mutationKey: keys.profileSet,
        mutationFn: (data: UserProfileRequest) => {
                return setProfileRequest(data);
        },
        onSuccess: (data) => {
            return data
        },
    });
};
