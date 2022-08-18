const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.cats.index);
router.get("/:id", ctrl.cats.show);
router.post("/", ctrl.cats.create);
router.put("/:id", ctrl.cats.update);
router.delete("/:id", ctrl.cats.destroy);

module.exports = router;