import { useQuery } from "@tanstack/react-query";
import { profileRequest } from "@/queries";
import {keys} from "@/queries/client/keys";


export const useProfile = () => {
    return useQuery({
        queryKey: keys.profile,
        queryFn: () => profileRequest(),
        enabled: false,
    });
};
