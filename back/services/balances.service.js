const { db } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const balancesService = {};

balancesService.depositMoney = async (accountId, amount, userId) => {
  const [account] = await db.query(
    ` SELECT * FROM accounts WHERE id = ${accountId} AND type = 'buyer'`,
  );
  if (account.length === 0) {
    throw new CustomError("Account not found", 404);
  }
  const [submissions] = await db.query(
    `SELECT s.* FROM submissions s INNER JOIN agreements a ON s.AgreementId = a.id WHERE a.status IN ('in_progress', 'new') AND (a.BuyerId = ${userId} ) AND s.paid = 0`,
  );
  if (submissions.length === 0) {
    throw new CustomError("No submissions found", 404);
  }
  let totalPrice = submissions.reduce((acc, submission) => {
    return acc + submission.price;
  }, 0);

  const tenPercent = totalPrice * 0.1;
  if (amount > tenPercent) {
    throw new CustomError("You cannot deposit that amount", 400);
  }
  account[0].balance = account[0].balance + amount;
  await db.query(
    `UPDATE accounts SET balance = ${account[0].balance} WHERE id = ${accountId}`,
  );
};

module.exports = balancesService;
