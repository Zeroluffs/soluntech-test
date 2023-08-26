const CustomError = require("../classUtils/CustomError");
const { Login, getAllUsers } = require("../services/user.service");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

userCtrl.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Login(username, password);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = userCtrl;
