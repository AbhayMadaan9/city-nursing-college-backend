import { type IFees } from "./fees.dto";
import FeesSchema from "./fees.schema";

export const createFees = async (data: IFees) => {
  const result = await FeesSchema.create({ ...data, active: true });
  return result;
};

export const updateFees = async (id: string, data: IFees) => {
  const result = await FeesSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editFees = async (id: string, data: Partial<IFees>) => {
  const result = await FeesSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteFees = async (id: string) => {
  const result = await FeesSchema.deleteOne({ _id: id });
  return result;
};

export const getFeesById = async (id: string) => {
  const result = await FeesSchema.findById(id).lean();
  return result;
};

export const getAllFees = async () => {
  const result = await FeesSchema.find({}).lean();
  return result;
};
