const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  start: Date,
  end: Date,
  accepted: Boolean,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  catsitter: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [ { type: Schema.Types.ObjectId, ref: "Message" } ],
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;