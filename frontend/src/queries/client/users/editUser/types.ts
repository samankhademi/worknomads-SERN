import {HttpResponse} from "@/queries/http";
import {AddUserFormRequest} from "@/components/dashboard/users/form";
import {User} from "@/queries";

export type EditUserRequestType = Partial<AddUserFormRequest>

export interface EditUserResponseType extends HttpResponse {
    message: User
}
