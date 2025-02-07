import mongoose from "mongoose";
import { type ISupply } from "./supply.dto";

const Schema = mongoose.Schema;

const SupplySchema = new Schema<ISupply>({}, { timestamps: true });

export default mongoose.model<ISupply>("supply", SupplySchema);
