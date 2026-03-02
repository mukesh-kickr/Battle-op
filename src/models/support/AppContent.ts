import mongoose, {Schema, Document} from "mongoose";

export interface IAppContent extends Document{
    title: 'Terms & Conditions' | 'Privacy Policy' | 'About Us'
    content: string,
    createdAt: Date,
    updatedAt: Date
}

const AppContentSchema = new Schema<IAppContent>({
    title: {
        type: String,
        enum: ['Terms & Conditions', 'Privacy Policy', 'About Us'],
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const AppContent = mongoose.model<IAppContent>("AppContent", AppContentSchema);
export default AppContent