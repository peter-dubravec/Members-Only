const mongoose = require("mongoose");
const Schema = mongoose.Schema
const moment = require("moment")

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true, maxLength: 100 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
})

MessageSchema.virtual("formatted_date").get(function () {
    return moment(this.timestamp).format('LLL');
})

module.exports = mongoose.model("Message", MessageSchema)