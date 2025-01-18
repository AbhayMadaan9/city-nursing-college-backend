import { type BaseSchema } from "../common/dto/base.dto";

export interface Ifees {
    type: string;
    amount: number;
}
export enum Caste {
    general = "general",
    obc = "obc",
    sc = "sc",
    st = "st",
    others = "others",
}
export interface IfeeStructure {
    cast: Caste;
    fees: Ifees[];
}
export interface ICourse extends BaseSchema {
    name: string;
    duration: number;
    fees: IfeeStructure;
    isDeleted: boolean;
}
