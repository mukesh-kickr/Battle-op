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
    feeType: string,
    pointsPerKill: number,
    sponseredBy: string,
    spectacteUrl?:string
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
    feeType: {
        type: String,
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
}, { timestamps: true })

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event