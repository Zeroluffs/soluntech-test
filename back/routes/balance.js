var express = require("express");
var router = express.Router();

const balance = require("../controllers/balances.controller");
const verifyToken = require("../middlewares/jsonwebtoknen");
/* GET users listing. */
router.post("/deposit/:accountId", verifyToken, balance.depositMoney);
module.exports = router;
