const { db, Orm } = require("../lib/orm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { status } = require("express/lib/response");
const CustomError = require("../classUtils/CustomError");

const userService = {};

userService.getAllUsers = async () => {
  return await db.query("SELECT * FROM accounts");
};

userService.Login = async (username, password) => {
  if (!(username && password)) {
    // return status(400).send("All input is required");
    throw new CustomError("All input is required", 400);
  }
  const sql = `SELECT * FROM accounts WHERE username = '${username}'`;
  const results = await db.query(sql);
  const user = results[0];
  if (user.length > 0) {
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      return jwt.sign(
        {
          userId: user[0].id,
          username: user[0].username,
          profession: user[0].profession,
          balance: user[0].balance,
          role: user[0].type,
        },
        "secret",
        { expiresIn: "2h" }
      );
    } else {
      throw new CustomError("Invalid Credentials", 400);
    }
  } else {
    throw new CustomError("Invalid Credentials", 400);
  }
};

module.exports = userService;
