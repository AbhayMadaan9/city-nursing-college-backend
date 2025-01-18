
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        userName: string;
        active?: boolean;
        role: "ADMIN";
        password: string
}
