var express = require("express");
var router = express.Router();

const agreement = require("../controllers/agreements.controller");
const verifyToken = require("../middlewares/jsonwebtoknen");
/* GET users listing. */
router.get("/", verifyToken, agreement.getAgreements);
router.get("/:id", verifyToken, agreement.getAgreementById);
module.exports = router;
