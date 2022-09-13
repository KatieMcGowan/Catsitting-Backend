const mongoose = require("mongoose");

const connectionString = 'mongodb+srv://JuneJune:DE3P7qCidX0Wi9sf@hitail.knhkj7t.mongodb.net/?retryWrites=true&w=majority'

const configOptions = {
  useNewUrlParser: true,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = ({
  User: require("./User"),
  Cat: require("./Cat"),
  Request: require("./Request"),
  Message: require("./Message")
})