import mongoose, { Document, PaginateModel } from "mongoose";
import { Caste, ICourse, Ifees, IfeeStructure } from "./course.dto";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const FeesSchema = new Schema<Ifees>(
  {
    type: { type: String, required: true }, // Type of fee
    amount: { type: Number, required: true }, // Fee amount
  },
  { _id: false },
);

const FeeStructureSchema = new Schema<IfeeStructure>(
  {
    cast: { type: String, enum: Caste, default: Caste.bc, required: true }, // Type of fee
    fees: [FeesSchema],
  },
  { _id: false },
);

const CourseSchema = new Schema<ICourse>(
  {
    name: { type: "string", required: true, unique: true },
    duration: { type: "number", required: true },
    fees: [FeeStructureSchema],
    isDeleted: { type: "boolean", default: false },
  },
  { timestamps: true },
);

CourseSchema.plugin(mongoosePaginate);

export default mongoose.model<ICourse, PaginateModel<ICourse>>(
  "course",
  CourseSchema,
);
