import mongoose, {Schema, Document} from "mongoose";

export interface ICustomerSupport extends Document{
    mobileNumber: string,
    watsappNumber: string,
    email: string,
    telegramNumber: string,
    telegramLink: string,
    createdAt: Date,
    updatedAt: Date
}

const CustomerSupportSchema = new Schema<ICustomerSupport>({
    mobileNumber: {
        type: String,
        required: true
    },
    watsappNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telegramNumber: {
        type: String,
        required: true
    },
    telegramLink: {
        type: String,
        required: true
    }
}, { timestamps: true })

const CustomerSupport = mongoose.model<ICustomerSupport>("CustomerSupport", CustomerSupportSchema);
export default CustomerSupport