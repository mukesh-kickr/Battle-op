import mongoose, {Schema, Document, Types} from "mongoose";

export interface IParticipant extends Document{
    userId: Types.ObjectId,
    eventId:Types.ObjectId,
    registeredAt: Date
}

const ParticipantSchema = new Schema<IParticipant>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    registeredAt: {
        type: Date,
       default: Date.now
    }
}, { timestamps: true })

ParticipantSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Participant = mongoose.model<IParticipant>("Participant", ParticipantSchema);
export default Participant