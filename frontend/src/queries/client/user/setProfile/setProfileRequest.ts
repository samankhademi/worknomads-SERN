import {http} from "@/queries/http/instance";
import {UserProfileRequest, UserProfileResponse} from "./types";

export const setProfileRequest = async (
    data: UserProfileRequest
): Promise<UserProfileResponse> => {
    try {
        return await http({
            method: "PUT",
            url: `/profile`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
