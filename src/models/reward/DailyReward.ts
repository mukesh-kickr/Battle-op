import mongoose, { Schema, Document } from "mongoose";

export interface IDailyReward extends Document {
  amount: number;
  rewardDate: Date;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const DailyRewardSchema = new Schema<IDailyReward>({
  amount: {
    type: Number,
    required: true,
  },
  rewardDate: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
   default:""
  },
}, { timestamps: true });

const DailyReward = mongoose.model<IDailyReward>("DailyReward", DailyRewardSchema);
export default DailyReward