import { Schema, model } from "mongoose"

const cardSchema = new Schema({
    _id: Schema.Types.ObjectId,
    word: { type: String, required: true },
    explanation: { type: String, required: true },
})

const setSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    link: { type: String, required: true },
    cards: [cardSchema],
}, {
    timestamps: true
})

const setModule = model("Set", setSchema)

export default setModule