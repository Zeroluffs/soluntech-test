var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { db } = require("../lib/orm");

router.get("/verify", async function (req, res) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, "secret");
    const getuser = jwt.decode(token);
    const userId = getuser.userId;

    const [user] = await db.query(
      `SELECT * FROM accounts WHERE id = ${userId}`
    );

    return res.status(200).send({
      isValid: true,
      newToken: jwt.sign(
        {
          userId: user[0].id,
          username: user[0].username,
          profession: user[0].profession,
          balance: user[0].balance,
          role: user[0].type,
        },
        "secret",
        { expiresIn: "2h" }
      ),
    });
  } catch (err) {
    res.status(401).send({
      isValid: false,
    });
  }
});

module.exports = router;
