import {http} from "@/queries/http/instance";
import {AddUserRequestType, AddUsersResponseType} from "./types";

export const addUsersRequest = async (
    data: AddUserRequestType
): Promise<AddUsersResponseType> => {
    try {
        return await http({
            method: "POST",
            url: `/users`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
