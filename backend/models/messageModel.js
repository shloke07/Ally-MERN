const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        recipient: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
    },
    {timestamps:true}
)

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;