import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document{
    title: string,
    poolPrize: number,
    prizePoolDescription: string,
    matchDate: Date,
    matchTime: string,
    version: string,
    map: string,
    matchRules: string,
    entryFee: number,
    pointsPerKill: number,
    sponseredBy: string,
    spectacteUrl?: string,
    gameId: mongoose.Schema.Types.ObjectId
    roomId?: string,
    roomPassword?: string,
    eventType: "Upcomming" | "Ongoing" | "Completed"
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required:true
    },
    poolPrize: {
        type: Number,
        required:true
    },
    prizePoolDescription: {
        type: String,
        required:true
    },
    matchDate: {
        type: Date,
        required:true
    },
    matchTime: {
        type: String,
        required:true
    },
    version: {
        type: String,
        required:true
    },
    map: {
        type: String,
        required:true
    },
    matchRules: {
        type: String,
        required:true
    },
    entryFee: {
        type: Number,
        required:true
    },
    pointsPerKill: {
        type: Number,
        required:true
    },
    sponseredBy: {
        type: String,
        required:true
    },
    spectacteUrl: {
        type: String,
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    roomId: {
        type: String,
    },
    roomPassword: {
        type: String,
    },
    eventType: {
        type: String,
        enum: ["Upcomming", "Ongoing", "Completed"],
        default: "Upcomming"
    }
}, { timestamps: true })

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event