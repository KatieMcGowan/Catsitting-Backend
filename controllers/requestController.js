const db = require("../models")

const index = (req, res) => {
  db.Request.find({}, (err, foundRequests) => {
    if (err) console.log("Error with Request index", err)
    if (!foundRequests) return res.json({
      message: "No Requests found in database"
    });
    res.status(200).json({requests: foundRequests})
  });
};

const show = (req, res) => {
  db.Request.findById(req.params.id, (err, foundRequest) => {
    if (err) console.log("Error with Request show");
    if (!foundRequest) return res.json({
      message: "Request not found in database"
    });
    res.status(200).json({request: foundRequest})
  });
};

const create = (req, res) => {
  db.Request.create(req.body, (err, savedRequest) => {
    if (err) console.log("Error with Request create", err)
    db.User.findById(req.body.creator, (err, foundUser) => {
      foundUser.requested.push(savedRequest);
      foundUser.save((err, savedUser) => {
        res.status(201).json({request: savedRequest})
      });
    });
  });
};

const update = (req, res) => {
  db.Request.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRequest) => {
    if (err) console.log("Error in Request update", err)
    res.status(200).json({request: updatedRequest})
  });
};

const destroy = (req, res) => {
  db.Request.findByIdAndDelete(req.params.id, (err, deletedRequest) => {
    if (err) console.log("Error with Request delete", err)
    db.Message.remove({
      _id: {
        $in: deletedRequest.messages
      }, 
    }, (err, data) => {
      res.status(200).json({request: deletedRequest})
    })
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};