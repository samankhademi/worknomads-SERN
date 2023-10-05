import {RoleEnum} from "common/enum/role.enum";
import {tokenTypes} from "config/tokens";

export type JwtPayload = {
    id: number;
    name: string;
    email: string;
    role: RoleEnum,
    type: tokenTypes,
    created_at: Date;
};
