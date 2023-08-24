var express = require("express");
var router = express.Router();

const user = require("../controllers/users.controller");
/* GET users listing. */
router.get("/", user.getUsers);
router.post("/login", user.login);

module.exports = router;
