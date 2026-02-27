import mongoose, {Schema, Document} from "mongoose";

export interface IMatchRules extends Document {
    title: string;
    rulesText: string;
}

const MatchRulesSchema = new Schema<IMatchRules>({
    title: {
        type: String,
        required: true
    },
    rulesText: {
        type: String,
        required: true
    }
}, { timestamps: true })

const MatchRules = mongoose.model<IMatchRules>("MatchRules", MatchRulesSchema);
export default MatchRules