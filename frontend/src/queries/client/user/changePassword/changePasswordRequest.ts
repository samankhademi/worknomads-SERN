import {http} from "@/queries/http/instance";
import {ChangePasswordRequestPayload} from "./types";

export const changePasswordRequest = async (
    data: ChangePasswordRequestPayload
) => {
    try {
        return await http({
            method: "PATCH",
            url: `/profile/change-password`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
