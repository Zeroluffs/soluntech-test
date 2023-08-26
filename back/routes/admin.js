var express = require("express");
const adminCtrl = require("../controllers/admin.controller");
var router = express.Router();

/* GET users listing. */
router.get(
  "/best-supplier-profession/:start/:end",
  adminCtrl.getBestProfessions
);

module.exports = router;
