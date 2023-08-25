var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/verify", function (req, res) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secret");
    res.status(200).send({
      isValid: true,
    });
  } catch (err) {
    return res.status(401).send({
      isValid: false,
    });
  }
});

module.exports = router;
