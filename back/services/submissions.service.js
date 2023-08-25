const { db } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const submissionsService = {};

submissionsService.getUnpaidSubmissionsPerUser = async (userId) => {
  const [submissions] = await db.query(
    `SELECT s.* FROM submissions s INNER JOIN agreements a ON s.AgreementId = a.id WHERE a.status IN ('in_progress') AND (a.BuyerId = ${userId} OR a.SupplierId = ${userId}) AND s.paid = 0`
  );
  if (submissions.length === 0) {
    throw new CustomError("No submissions", 404);
  }
  return submissions;
};

submissionsService.payUserSubmission = async (id, price, userId) => {
  const [buyer] = await db.query(
    `SELECT * FROM accounts WHERE id = ${userId} AND  type = 'buyer'`
  );

  const [agreement] = await db.query(
    `SELECT * FROM agreements INNER JOIN submissions ON submissions.AgreementId = agreements.id WHERE submissions.id = ${id} AND (agreements.BuyerId = ${userId}) AND (agreements.status = 'in_progress' OR agreements.status = 'new')`
  );
  const [submission] = await db.query(
    `SELECT * FROM submissions WHERE id = ${id} AND paid = 0`
  );
  if (submission.length === 0) {
    throw new CustomError("Submission Already Paid", 404);
  }
  const suppliedId = agreement[0].SupplierId;
  const [supplier] = await db.query(
    `SELECT * FROM accounts WHERE id = ${suppliedId} AND  type = 'supplier'`
  );
  if (buyer[0].balance < price) {
    throw new CustomError("Insufficient Funds", 400);
  }
  buyer[0].balance = buyer[0].balance - price;
  await db.query(
    `UPDATE accounts SET balance = ${buyer[0].balance} WHERE id = ${userId}`
  );
  supplier[0].balance = supplier[0].balance + price;
  await db.query(
    `UPDATE accounts SET balance = ${supplier[0].balance} WHERE id = ${suppliedId}`
  );
  agreement[0].status = "terminated";
  submission[0].paid = 1;
  await db.query(`UPDATE submissions SET paid = 1 WHERE id = ${id}`);
  await db.query(
    `UPDATE agreements SET status = 'terminated' WHERE id = ${agreement[0].id}`
  );
};

module.exports = submissionsService;
