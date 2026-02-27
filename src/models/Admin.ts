import mongoose, { Schema, Document } from "mongoose";
export interface IAdmin extends Document{
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    profilePhoto?: string;
    profilePhotoPublicId?: string;
}

const AdminSchema = new Schema<IAdmin>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default:""
    },
    profilePhotoPublicId: {
        type: String,
    },
},{timestamps: true})

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin