import {HttpResponse} from "@/queries/http";

export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    sex: SexEnum
    age: number
    role: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    deletedAt: any
    books: any[]
}
export interface UserResponse extends HttpResponse{
    message: User
}
export enum SexEnum {
    FEMALE = 0,
    MALE = 1
}
export enum RoleEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}