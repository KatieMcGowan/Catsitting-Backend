const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.users.index);
router.get("/:id", ctrl.users.show);
router.post("/", ctrl.users.create);
router.put("/:id", ctrl.users.update);

module.exports = router;