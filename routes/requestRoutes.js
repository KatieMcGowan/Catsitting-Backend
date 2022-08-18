const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.requests.index);
router.get("/:id", ctrl.requests.show);
router.post("/", ctrl.requests.create);
router.put("/:id", ctrl.requests.update);
router.delete("/:id", ctrl.requests.destroy);

module.exports = router;