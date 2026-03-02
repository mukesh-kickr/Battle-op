import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string,
    mobileNumber: string,
    email: string,
    dob: string,
    password: string,
    totalBalance: number,
    scratchCardEarnigs: number,
    winningAmount: number,
    totalMatchesPlayed:number,
    status: 'Active' | 'Suspended'| 'Banned'
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    dob: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    totalBalance: {
        type: Number,
        default: 0
    },
    scratchCardEarnigs: {
        type: Number,
        default: 0
    },
    winningAmount: {
        type: Number,
        default: 0
    },
    totalMatchesPlayed: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Suspended', 'Banned'],
        default: 'Active'
    }
}, { timestamps: true })

const User = mongoose.model<IUser>("User", UserSchema);
export default User