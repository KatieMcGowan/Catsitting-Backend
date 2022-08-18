const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  displayname: String,
  apartment: String,
  cats: [ { type: Schema.Types.ObjectId, ref: "Cat" } ],
  requested: [ { type: Schema.Types.ObjectId, ref: "Request" }],
  accepted: [ { type: Schema.Types.ObjectId, ref: "Request" }],
})

const User = mongoose.model("User", UserSchema);

module.exports = User;