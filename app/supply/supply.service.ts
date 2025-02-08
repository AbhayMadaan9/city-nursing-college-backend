import mongoose from "mongoose";
import { IsemesterFee } from "../semester-fee/semester-fee.dto";
import { IStudent } from "../student/student.dto";
import { type ISupply } from "./supply.dto";
import SupplySchema from "./supply.schema";

export const createSupply = async (data: ISupply) => {
  const result = await SupplySchema.create({ ...data, active: true });
  return result;
};

export const updateSupply = async (id: string, data: ISupply) => {
  const result = await SupplySchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editSupply = async (id: string, data: Partial<ISupply>) => {
  const result = await SupplySchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteSupply = async (id: string) => {
  const result = await SupplySchema.deleteOne({ _id: id });
  return result;
};

export const getSupplyById = async (id: string) => {
  const result = await SupplySchema.findById(id).lean();
  return result;
};
export const getSupplyCountOfStudentSubject = async ({
  student,
  semester,
  subject,
}: {
  student: string;
  semester: string;
  subject: string;
}) => {
  const result = await SupplySchema.count({
    semester,
    student,
    subject,
  }).lean();
  return result;
};

export const getAllSupply = async () => {
  const result = await SupplySchema.find({}).lean();
  return result;
};
export const getAllSupplyWithPopulation = async (
  studentRegistrationNumber?: string
) => {
  const matchQuery: Record<string, any> = {};
  if (studentRegistrationNumber) {
    matchQuery.student.registrationNumber = studentRegistrationNumber;
  }
  console.log(mongoose.modelNames());
  const result = await SupplySchema.find()
    .populate({
      path: "student",
      model: "student",
      populate: {
        path: "course",
        populate: {
          path: "semesters",
        },
      },
    })
    .populate({ path: "semester", model: "SemesterFee" })
    .sort({ createdAt: "descending" })
    .lean();
  return result;
};
