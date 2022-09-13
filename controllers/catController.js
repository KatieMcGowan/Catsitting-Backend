const db = require("../models")

const index = (req, res) => {
  db.Cat.find({}, (err, foundCats) => {
    if (err) console.log("Error with Cat index", err)
    if (!foundCats) return res.json({
      message: "No Cats found in database"
    });
    res.status(200).json({cats: foundCats})
  });
};

const show = (req, res) => {
  db.Cat.findById(req.params.id, (err, foundCat) => {
    if (err) console.log("Error with Cat show");
    if (!foundCat) return res.json({
      message: "Cat not found in database"
    });
    res.status(200).json({cat: foundCat})
  });
};

const create = (req, res) => {
  db.Cat.create(req.body, (err, savedCat) => {
    console.log(savedCat)
    if (err) console.log("Error with Cat create", err)
    db.User.findById(req.body.user, (err, foundUser) => {
      foundUser.cats.push(savedCat);
      foundUser.save((err, savedCat) => {
        res.status(201).json({cat: savedCat})
      });
    });
  });
};

const update = (req, res) => {
  db.Cat.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCat) => {
    if (err) console.log("Error in Cat update", err)
    res.status(200).json({cat: updatedCat})
  });
};

const destroy = (req, res) => {
  db.Cat.findByIdAndDelete(req.params.id, (err, deletedCat) => {
    if (err) console.log("Error with Cat delete", err)
    db.User.findOne({"cats": req.params.id}, (err, foundUser) => {
      foundUser.cats.remove(req.params.id);
      foundUser.save((err, updatedUser) => {
        res.status(200).json({cat: deletedCat})
      });
    });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};