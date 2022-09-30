const express = require("express");
const { toyCtrl } = require("../controllers/toyControll");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/",toyCtrl.getToy)
router.get("/prices",toyCtrl.toysByPrice)
// /toys/?s=
router.get("/search" ,toyCtrl.searchToy)
router.get("/category/:catName" ,toyCtrl.toyByCategory)
router.post("/", auth, toyCtrl.addToy)
router.put("/:editId", auth,toyCtrl.editToy)
router.delete("/:delId", auth, toyCtrl.deleteToy)

module.exports = router;