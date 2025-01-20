
            import {type IsemesterFee} from "./semester-fee.dto";
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

            export const editsemesterFee = async (id: string, data: Partial<IsemesterFee>) => {
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

            export const getAllsemesterFee = async () => {
                const result = await semesterFeeSchema.find({}).lean();
                return result;
            };
