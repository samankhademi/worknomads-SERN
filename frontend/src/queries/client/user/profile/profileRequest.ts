import { http } from "@/queries/http/instance";
import { UserResponse } from "./types";
import {storage} from "@/core";
import {AxiosError} from "axios";

export const profileRequest = async (): Promise<UserResponse> => {
    try {
        const user =  await http({
            method: "GET",
            url: `/profile`,
        }).catch((error:AxiosError) => {
            if (error?.status === 401){
                storage.profile.remove();
                storage.jwt.remove();
            }
        })
        storage.profile.set(user.message);
        return user;
    } catch (error) {
        throw error;
    }
};
