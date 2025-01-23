import { Caste } from "../semester-fee/semester-fee.dto";
import { type IStudent } from "./student.dto";
import StudentSchema from "./student.schema";
import moment from "moment";

export const createStudent = async (data: IStudent) => {
  const result = await StudentSchema.create({ ...data, active: true });
  return result;
};

export const updateStudent = async (id: string, data: IStudent) => {
  const result = await StudentSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editStudent = async (id: string, data: Partial<IStudent>) => {
  const result = await StudentSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteStudent = async (id: string) => {
  const result = await StudentSchema.updateOne(
    { _id: id },
    { isDeleted: true },
  );
  return result;
};

export const getStudentById = async (id: string) => {
  const result = await StudentSchema.findById(id).lean();
  return result;
};

export const getStudentBySerialNumber = async (serialNumber: string) => {
  const result = await StudentSchema.findOne({ serialNumber }).lean();
  return result;
};

export const getStudentByRegistrationNumber = async (
  registrationNumber: string,
) => {
  const result = await StudentSchema.findOne({ registrationNumber }).lean();
  return result;
};
export const getStudentByAadharNumber = async (aadharNumber: string) => {
  const result = await StudentSchema.findOne({ aadharNo: aadharNumber }).lean();
  return result;
};

export const getAllStudent = async (options: Record<string, any>) => {
  const result = await StudentSchema.paginate(
    { isDeleted: false },
    { ...options, populate: "course" },
  );
  return result;
};

export const getAllStudentCount = async () => {
  const result = await StudentSchema.count({ isDeleted: false });
  return result;
};

export const getStudentCountsCategoryWise = async () => {
  const result = await StudentSchema.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        sc: { $sum: { $cond: [{ $eq: ["$category", Caste.SC] }, 1, 0] } },
        general: { $sum: { $cond: [{ $eq: ["$category", Caste.GENERAL] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        sc: 1,
        general: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0] : { sc: 0, general: 0 };
};

export const getCurrentMonthStudentFeesCount = async () => {
  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();
  const result = await StudentSchema.aggregate([
    {
      $match: {
        isDeleted: false,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$netFees" },
      },
    },
    {
      $project: {
        _id: 0,
        amount: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0].amount : 0;
};
export const getCourseStudentCount = async (courseId: string) => {
  const result = await StudentSchema.count({ course: courseId, isDeleted: false });
  return result;
};