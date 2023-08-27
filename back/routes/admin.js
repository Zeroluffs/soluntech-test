var express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/jsonwebtoknen");
var router = express.Router();

router.get(
  "/best-supplier-profession/:start/:end",
  verifyToken,
  adminCtrl.getBestProfessions
);

router.get(
  "/best-buyers/:start/:end/:limit",
  verifyToken,
  adminCtrl.getBestBuyers
);

module.exports = router;
