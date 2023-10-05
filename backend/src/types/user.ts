import {UsersEntity} from "common/entities/users.entity";

declare namespace Express {
    export interface Request {
        user?: UsersEntity
    }
}