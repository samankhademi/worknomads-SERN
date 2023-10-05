import {http} from "@/queries/http/instance";
import { EditUserRequestType, EditUserResponseType } from "./types";

export const editUserRequest = async (
    data: EditUserRequestType,
    id?: number,
): Promise<EditUserResponseType> => {
    if(!id && data){
        id = data.id;
    }
    try {
        return await http({
            method: "PATCH",
            url: `/users/${id}`,
            data,
        });
    } catch (error) {
        throw error;
    }
};
