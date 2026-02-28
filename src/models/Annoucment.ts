import mongoose, {Schema, Document} from "mongoose";

export interface IAnnouncment extends Document{
    targetUsers: String[]
    title: String
    message: String
}

const AnnouncmentSchema = new Schema<IAnnouncment>({
    targetUsers: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })
const Announcment = mongoose.model<IAnnouncment>("Announcment", AnnouncmentSchema);
export default Announcment