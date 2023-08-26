var express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/jsonwebtoknen");
var router = express.Router();

/* GET users listing. */
router.get(
  "/best-supplier-profession/:start/:end",
  verifyToken,
  adminCtrl.getBestProfessions
);

module.exports = router;
