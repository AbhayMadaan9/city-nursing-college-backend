
        import mongoose from "mongoose";
        import { type IsemesterFee  } from "./semester-fee.dto";
        
        const Schema = mongoose.Schema;

        const semesterFeeSchema = new Schema<IsemesterFee>({}, { timestamps: true });
    
        export default mongoose.model<IsemesterFee>("semesterFee", semesterFeeSchema);
    