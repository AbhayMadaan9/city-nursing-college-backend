import mongoose from "mongoose";
import { type IFees } from "./fees.dto";

const Schema = mongoose.Schema;

const FeesSchema = new Schema<IFees>({}, { timestamps: true });

export default mongoose.model<IFees>("fees", FeesSchema);
