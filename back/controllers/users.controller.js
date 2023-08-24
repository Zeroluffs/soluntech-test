const { db, Orm } = require("../lib/orm");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const users = await db.query("SELECT * FROM accounts");
  res.json(users);
};

userCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send("All input is required");
  }
  console.log(username);
  const sql = `SELECT * FROM accounts WHERE username = '${username}'`;
  const results = await db.query(sql);
  const user = results[0];
  if (user.length > 0) {
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      const token = jwt.sign(
        {
          userId: user[0].id,
          username: user[0].username,
          profession: user[0].profession,
          balance: user[0].balance,
        },
        "secret",
        { expiresIn: "2h" }
      );
      res.status(200).send({
        token,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  }
};

module.exports = userCtrl;
