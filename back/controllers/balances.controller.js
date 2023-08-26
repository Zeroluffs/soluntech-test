const CustomError = require("../classUtils/CustomError");
const { db } = require("../lib/orm");
const { depositBuyerMoney } = require("../services/balances.service");

const balanceCtrl = {};

balanceCtrl.depositMoney = async (req, res) => {
  const { accountId } = req.params;
  const { amount } = req.body;
  const { userId } = req.user;
  try {
    await depositBuyerMoney(accountId, amount, userId);
    return res.json({ message: "Deposit Successful" });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = balanceCtrl;
