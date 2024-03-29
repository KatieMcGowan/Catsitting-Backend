const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messager: { type: Schema.Types.ObjectId, ref: "User" },
  body: String,
}, { timestamps: true} )

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;