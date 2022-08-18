const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatSchema = new Schema({
  catname: String,
  age: Number,
  breed: String,
  feeding: String,
  personality: [String],
  medication: [String],
  additionalnotes: [String],
});

const Cat = mongoose.model("Cat", CatSchema);

module.exports = Cat;