import mongoose, {Schema,Document} from "mongoose";

export interface IGame extends Document{
    title: string,
    name: string,
    imageUrl?:string
}

const GameSchema = new Schema<IGame>({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true })

const Game = mongoose.model<IGame>("Game", GameSchema);
export default Game