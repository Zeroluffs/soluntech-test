const { db } = require("../lib/orm");
const { depositBuyerMoney } = require("../services/balances.service");

const balanceCtrl = {};

balanceCtrl.depositMoney = async (req, res) => {
  const { accountId } = req.params;
  const { amount } = req.body;
  const { userId } = req.user;
  try {
    depositBuyerMoney(accountId, amount, userId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(e.code).json({ message: e.message });
  }
};

module.exports = balanceCtrl;
