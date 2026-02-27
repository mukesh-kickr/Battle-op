import mongoose, {Schema, Document} from "mongoose";

export interface IBanner extends Document{
    title: string,
    imageUrl: string
}

const BannerSchema = new Schema<IBanner>({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Banner = mongoose.model<IBanner>("Banner", BannerSchema);
export default Banner