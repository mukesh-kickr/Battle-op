import mongoose, { Schema, Document } from "mongoose";

export interface IScratchCard extends Document {
  minWinningCoins: number;
  maxWinningCoins: number;
  targetMatchCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ScratchCardSchema = new Schema<IScratchCard>({
    minWinningCoins: {
        type: Number,
        required: true
    },
    maxWinningCoins: {
        type: Number,
        required: true
    },
    targetMatchCount: {
        type: Number,
        required: true
    }
}, { timestamps: true })
const ScratchCard = mongoose.model<IScratchCard>("ScratchCard", ScratchCardSchema);
export default ScratchCard
