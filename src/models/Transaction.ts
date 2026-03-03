import mongoose, {Schema, Document} from "mongoose";

export interface ITransaction extends Document{
    userId: string,
    name: string,
    username: string,
    mobileNo: string,
    transactionId: string,
    amount: number,
    totalWinnings: number,
    status: string,
    type:string
}
const TransactionSchema = new Schema<ITransaction>({
    userId: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    username: {
        type: String,
        
    },
    mobileNo: {
        type: String,
        
    },
    transactionId: {
        type: String,
        
    },
    amount: {
        type: Number,
        default: 0
    },
    totalWinnings: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Rejected", "Accepted"],
        default: "Pending"
    },
    type: {
        type: String,
        enum:["Deposit","Withdrawal","Claimed"],
        
    }

}, { timestamps: true })

const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction