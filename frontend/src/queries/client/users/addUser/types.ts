import {HttpResponse} from "@/queries/http";
import {User} from "@/queries";
import {AddUserFormRequest} from "@/components/dashboard/users/form";

export type AddUserRequestType = AddUserFormRequest

export interface AddUsersResponseType extends HttpResponse {
    message: User
}
