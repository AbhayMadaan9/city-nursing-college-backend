import mongoose from "mongoose";
import { type ISupply } from "./supply.dto";

const Schema = mongoose.Schema;

const SupplySchema = new Schema<ISupply>({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

SupplySchema.pre("save", async function (next) {
  if (this.subject) {
    this.subject = this.subject.trim().toLowerCase()
  }
  next();
});
export default mongoose.model<ISupply>("supply", SupplySchema);
