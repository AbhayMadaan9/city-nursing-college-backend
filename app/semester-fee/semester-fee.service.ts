import { Types } from "mongoose";
import { Caste, type IsemesterFee } from "./semester-fee.dto";
import semesterFeeSchema from "./semester-fee.schema";

export const createsemesterFee = async (data: IsemesterFee) => {
  const result = await semesterFeeSchema.create({ ...data, active: true });
  return result;
};

export const updatesemesterFee = async (id: string, data: IsemesterFee) => {
  const result = await semesterFeeSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editsemesterFee = async (
  id: string,
  data: Partial<IsemesterFee>,
) => {
  const result = await semesterFeeSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deletesemesterFee = async (id: string) => {
  const result = await semesterFeeSchema.deleteOne({ _id: id });
  return result;
};

export const getsemesterFeeById = async (id: string) => {
  const result = await semesterFeeSchema.findById(id).lean();
  return result;
};

export const getAllsemesterFee = async (courseId?: string) => {
  const query: Record<string, string | Types.ObjectId> = {};
  if (courseId) {
    query.course = new Types.ObjectId(courseId);
  }
  const result = await semesterFeeSchema.find(query).lean();
  return result;
};

export const getTotalFeesByCaste = async (course: string, caste: Caste): Promise<number> => {
  if (!Object.values(Caste).includes(caste)) {
    throw new Error(`Invalid caste value. Must be one of: ${Object.values(Caste).join(", ")}`);
  }

  const result = await semesterFeeSchema.aggregate([
    // Unwind the fees array to handle each fee object individually
    { $unwind: "$fees" },
    // Unwind the details array to handle each caste-specific fee detail
    { $unwind: "$fees.details" },
    // Match the desired caste
    { $match: { "fees.details.caste": caste, course: new Types.ObjectId(course) } },
    // Group by null to calculate the total sum of all amounts for the caste
    {
      $group: {
        _id: null,
        totalFees: { $sum: "$fees.details.amount" },
      },
    },
  ]);

  // Return the total fees, defaulting to 0 if no matching fees are found
  return result.length > 0 ? result[0].totalFees : 0;
};