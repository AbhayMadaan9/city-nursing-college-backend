import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface ISupply extends BaseSchema {
    student: Types.ObjectId;
    semester: Types.ObjectId;
    subject: string;
    amount: number;
}
