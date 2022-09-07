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
  db.Request.findById(req.params.id, (err, foundRequest) => {
    let oldRequest = foundRequest
    db.Request.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRequest) => {
      if(oldRequest.accepted === false && updatedRequest.accepted === true) {
        db.User.findById(updatedRequest.catsitter, (err, foundUser) => {
          foundUser.accepted.push(updatedRequest);
          foundUser.save((err, savedUser) => {
            res.status(200).json({request: updatedRequest})
          });
        })
      } else if(oldRequest.accepted === true && updatedRequest.accepted === false) {
        db.Request.findByIdAndUpdate(req.params.id, {$unset: {catsitter: 1}}, {new: true}, (err, foundRequest) => {
          db.User.findByIdAndUpdate(updatedRequest.catsitter, {$pull: {"accepted": `${req.params.id}`}}, {new: true}, (err, foundUser) => {
            foundUser.save((err, savedUser) => {
              res.status(200).json({request: updatedRequest})
            });
          });
        });
      } else {
        res.status(200).json({request: updatedRequest})
      } 
    });
  });
};

//Need to find out how to remove all messages
const destroy = (req, res) => {
  db.Request.findByIdAndDelete(req.params.id, (err, deletedRequest) => {
    if (err) console.log("Error with Request delete", err)
    console.log(deletedRequest)
    if ("catsitter" in deletedRequest === false && deletedRequest.messages.length === 0) {
      console.log("No catsitter no messages route hit")
      db.User.findByIdAndUpdate(deletedRequest.creator, { $pull: {"requested": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {
        res.status(200).json({request: deletedRequest})
      })
    } else if ("catsitter" in deletedRequest === true && deletedRequest.messages.length === 0) {
      console.log("Yes catsitter no messages route hit")
      db.User.findByIdAndUpdate(deletedRequest.creator, { $pull: {"requested": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {
        console.log(updatedUser)
      });
      db.User.findByIdAndUpdate(deletedRequest.catsitter, { $pull: {"accepted": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {
        console.log(updatedUser)
        res.status(200).json({request: deletedRequest})
      })
    } else if ("catsitter" in deletedRequest === false && deletedRequest.messages.length > 0) {
      console.log("No catsitter yes messages route hit")
      db.User.findByIdAndUpdate(deletedRequest.creator, { $pull: {"requested": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {});
      db.Message.remove({
        _id: {
          $in: deletedRequest.messages
        }
      }), res.status(200).json({request: deletedRequest})
    } else if ("catsitter" in deletedRequest === true && deletedRequest.messages.length > 0) {
      console.log("Yes catsitter yes messages route hit")
      db.User.findByIdAndUpdate(deletedRequest.creator, { $pull: {"requested": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {});
      db.User.findByIdAndUpdate(deletedRequest.catsitter, { $pull: {"accepted": `${req.params.id}`}}, { new: true}, (err, updatedUser) => {})
      db.Message.remove({
        _id: {
          $in: deletedRequest.messages
        }
      }), res.status(200).json({request: deletedRequest})
    };
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};