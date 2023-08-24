var express = require("express");
var router = express.Router();

const submission = require("../controllers/submission.controller");
const verifyToken = require("../middlewares/jsonwebtoknen");
/* GET users listing. */
router.get("/unpaid", verifyToken, submission.getUnpaidSubmissions);
module.exports = router;
