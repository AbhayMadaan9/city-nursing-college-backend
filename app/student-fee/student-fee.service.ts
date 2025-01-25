
import { Types } from "mongoose";
import { ICourse } from "../course/course.dto";
import { IsemesterFee } from "../semester-fee/semester-fee.dto";
import { type IStudentFee } from "./student-fee.dto";
import StudentFeeSchema from "./student-fee.schema";

export const createStudentFee = async (data: IStudentFee) => {
    const result = await StudentFeeSchema.create({ ...data, active: true });
    return result;
};

export const updateStudentFee = async (id: string, data: IStudentFee) => {
    const result = await StudentFeeSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
};

export const editStudentFee = async (id: string, data: Partial<IStudentFee>) => {
    const result = await StudentFeeSchema.findOneAndUpdate({ _id: id }, data);
    return result;
};

export const deleteStudentFee = async (id: string) => {
    const result = await StudentFeeSchema.deleteOne({ _id: id });
    return result;
};

export const getStudentFeeById = async (id: string) => {
    const result = await StudentFeeSchema.findById(id).lean();
    return result;
};
export const getLatestStudentFeeBySemester = async (semester: string, student: string) => {
    const result = await StudentFeeSchema.findOne({semester, student}).sort({createdAt: -1}).lean();
    return result;
};
export const getTotalAmountPaidByStudentForSemester = async (semester: string, student: string): Promise<number> => {
  
    // Aggregate the total paid amount
    const result = await StudentFeeSchema.aggregate([
      // Match the documents for the given semester and student
      {
        $match: {
          semester: new Types.ObjectId(semester),
          student: new Types.ObjectId(student),
        },
      },
      // Group the results and calculate the sum of paidAmount
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$paidAmount" },
        },
      },
    ]);
  
    // Return the total paid amount, or 0 if no payments exist
    return result.length > 0 ? result[0].totalPaid : 0;
  };
export const getAllStudentFee = async () => {
    const result = await StudentFeeSchema.find({}).lean();
    return result;
};
export const getAllStudentFeeWithSemsterInfo = async () => {
    const result = await StudentFeeSchema.find({}).populate<{ semester: IsemesterFee & { course: ICourse } }>([{
        path: "semester",
        populate: {
            path: "course",
        }
    }]).lean();
    return result;
};
