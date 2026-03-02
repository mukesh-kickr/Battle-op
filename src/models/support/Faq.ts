import mongoose, {Schema, Document} from "mongoose";

export interface IFaq extends Document {
    question: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date
}

const FaqSchema = new Schema<IFaq>({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Faq = mongoose.model<IFaq>("Faq", FaqSchema);
export default Faq