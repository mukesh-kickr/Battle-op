import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document{
    title: string,
    message: string
}

const NotificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

}, { timestamps: true })
const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification