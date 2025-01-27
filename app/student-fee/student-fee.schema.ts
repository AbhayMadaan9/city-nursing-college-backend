
import mongoose from "mongoose";
import { PaymentMode, type IStudentFee } from "./student-fee.dto";

const Schema = mongoose.Schema;

const StudentFeeSchema = new Schema<IStudentFee>({
        student: {
                type: Schema.Types.ObjectId,
                ref: "Student",
                required: true,
        },
        semester: {
                type: Schema.Types.ObjectId,
                ref: "SemesterFee",
                required: true,
        },
        totalFees: {
                type: Number,
                required: true,
        },
        totalDiscount: {
                type: Number,
                required: true,
        },
        balanceFees: {
                type: Number,
                required: true,
        },
        paidAmount: {
                type: Number,
                required: true,
                default: 0
        },
        modeOfPayment: {
                type: String,
                enum: Object.values(PaymentMode),
                required: true,
        },
        payDate: {
                type: Date,
                required: true,
        },
        transactionId: {
                type: String,
        },
}, { timestamps: true });

export default mongoose.model<IStudentFee>("studentFee", StudentFeeSchema);
