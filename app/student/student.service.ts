import { type IStudent } from "./student.dto";
import StudentSchema from "./student.schema";

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
  const result = await StudentSchema.updateOne({ _id: id }, {isDeleted: true});
  return result;
};

export const getStudentById = async (id: string) => {
  const result = await StudentSchema.findById(id).lean();
  return result;
};

export const getStudentBySerialNumber = async (serialNumber: string) => {
  const result = await StudentSchema.findOne({serialNumber}).lean();
  return result;
};

export const getStudentByRegistrationNumber = async (registrationNumber: string) => {
  const result = await StudentSchema.findOne({registrationNumber}).lean();
  return result;
};
export const getStudentByAadharNumber = async (aadharNumber: string) => {
  const result = await StudentSchema.findOne({aadharNo: aadharNumber}).lean();
  return result;
};

export const getAllStudent = async (options: Record<string, any>) => {
  const result = await StudentSchema.paginate({ isDeleted: false }, {...options, populate: 'course'});
  return result;
};