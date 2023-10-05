import {HttpResponse} from "@/queries/http";
import {User} from "@/queries";
import {AddUserFormRequest} from "@/components/dashboard/users/form";

export interface UsersResponse extends HttpResponse{
    message: {
        users: User[]
        total: number
        page: number
        take: number
    }
}

export type UsersListWithFilter = Partial<AddUserFormRequest> & {
    page: number,
    take: number
}