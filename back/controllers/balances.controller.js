const { db } = require("../lib/orm");

const balanceCtrl = {};

balanceCtrl.depositMoney = async (req, res) => {
  const { accountId } = req.params;
  const { amount } = req.body;
  const userId = req.user.userId;
  const [account] = await db.query(
    ` SELECT * FROM accounts WHERE id = ${accountId} AND type = 'buyer'`,
  );
  if (account.length === 0) {
    return res.status(400).json({ message: "Account not found" });
  }
  const [submissions] = await db.query(
    `SELECT s.* FROM submissions s INNER JOIN agreements a ON s.AgreementId = a.id WHERE a.status IN ('in_progress', 'new') AND (a.BuyerId = ${req.user.userId} )
    AND s.paid = 0
    `,
  );
  let totalPrice = submissions.reduce((acc, submission) => {
    return acc + submission.price;
  }, 0);

  const tenPercent = totalPrice * 0.1;
  if (amount > tenPercent) {
    return res.status(400).json({ message: "You cannot deposit that amount" });
  }
  account[0].balance = account[0].balance + amount;
  await db.query(
    `UPDATE accounts SET balance = ${account[0].balance} WHERE id = ${accountId}`,
  );
  return res.sendStatus(200);
};

module.exports = balanceCtrl;
