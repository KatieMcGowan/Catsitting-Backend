const db = require("../models");

const index = (req, res) => {
  db.Message.find({}, (err, foundMessages) => {
    if (err) console.log("Error with Message index", err)
    if (!foundMessages) return res.json({
      message: "No Messages found in database"
    });
    res.status(200).json({messages: foundMessages})
  });
};

const show = (req, res) => {
  db.Message.findById(req.params.id, (err, foundMessage) => {
    if (err) console.log("Error with Message show");
    if (!foundMessage) return res.json({
      message: "Message not found in database"
    });
    res.status(200).json({message: foundMessage})
  });
};

const create = (req, res) => {
  db.Message.create(req.body, (err, savedMessage) => {
    if (err) console.log("Error with Message create", err)
    res.status(201).json({message: savedMessage})
  });
};

module.exports = {
  index,
  show,
  create,
}