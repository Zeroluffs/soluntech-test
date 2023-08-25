const { db } = require("../lib/orm");
const { depositBuyerMoney } = require("../services/balances.service");

const balanceCtrl = {};

balanceCtrl.depositMoney = async (req, res) => {
  const { accountId } = req.params;
  const { amount } = req.body;
  const { userId } = req.user;
  try {
    await depositBuyerMoney(accountId, amount, userId);
    return res.json({ message: "Deposit Successfull" });
  } catch (e) {
    console.log("got here");
    res.status(e.code).json({ message: e.message });
  }
};

module.exports = balanceCtrl;
