import mongoose, { PaginateModel } from "mongoose";
import { ISession, type IStudent } from "./student.dto";
import mongoosePaginate from "mongoose-paginate-v2";
import { Caste } from "../semester-fee/semester-fee.dto";

const Schema = mongoose.Schema;
const SessionSchema = new Schema<ISession>(
  {
    from: { type: Number, required: true, unique: true },
    to: { type: Number, required: true, unique: true },
  },
  { _id: false },
);
const StudentSchema = new Schema<IStudent>(
  {
    serialNumber: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    session: SessionSchema,
    name: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "course", required: true },
    feesDiscount: { type: Number, required: true },
    netFees: { type: Number, required: true },
    dob: { type: Date, required: true },
    aadharNo: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contactNo: { type: String, required: true },
    category: { type: String, enum: Object.values(Caste), required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

StudentSchema.plugin(mongoosePaginate);

export default mongoose.model<IStudent, PaginateModel<IStudent>>(
  "student",
  StudentSchema,
);
