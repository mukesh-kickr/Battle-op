import mongoose, {Schema, Document} from "mongoose";

export interface ICoupon extends Document{
    couponType: string,
    minAmount: number,
    maxAmount: number,
    coinAmount: number,
    couponCode: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

const CouponSchema = new Schema<ICoupon>({
    couponType: {
        type: String,
        required: true
    },
    minAmount: {
        type: Number,
        required: true
    },
    maxAmount: {
        type: Number,
        required: true
    },
    coinAmount: {
        type: Number,
        required: true
    },
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })
const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);
export default Coupon