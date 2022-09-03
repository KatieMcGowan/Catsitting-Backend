const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatSchema = new Schema({
  catname: String,
  age: Number,
  breed: String,
  feeding: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  personality: String,
  medication: String,
  additionalnotes: String,
});

const Cat = mongoose.model("Cat", CatSchema);

module.exports = Cat;