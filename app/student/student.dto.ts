import { Types } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";
import { Caste } from "../course/course.dto";



export interface IStudent extends BaseSchema {
    serialNumber: string;
    registrationNumber: string;
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
}
