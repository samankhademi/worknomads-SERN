import {HttpResponse} from "@/queries/http";
import {User} from "@/queries";

export type UserProfileRequest = Partial<User>

export interface UserProfileResponse extends HttpResponse{
    message: User
}
