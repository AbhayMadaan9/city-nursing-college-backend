import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";
import { Caste } from "../semester-fee/semester-fee.dto";

export interface ISession {
  from: number;
  to: number;
}
export interface IStudent extends BaseSchema {
  serialNumber: string;
  registrationNumber: string;
  session: ISession;
  name: string;
  motherName: string;
  fatherName: string;
  course: Types.ObjectId;
  feesDiscount: number;
  dob: Date;
  aadharNo: string;
  address: string;
  contactNo: string;
  category: Caste;
  isDeleted: boolean;
  netFees: number;
}
