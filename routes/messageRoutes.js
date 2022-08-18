const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.messages.index);
router.get("/:id", ctrl.messages.show);
router.post("/", ctrl.messages.create);

module.exports = router;