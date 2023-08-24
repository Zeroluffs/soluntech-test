const { db } = require("../lib/orm");

const submissionCtrl = {};

submissionCtrl.getUnpaidSubmissions = async (req, res) => {
  //   const submissions = await db.query(
  //     `SELECT * FROM submissions WHERE status IN ('in_progress') AND (BuyerId = ${req.user.userId} OR SupplierId = ${req.user.userId})
  //     `
  //   );

  const submissions = await db.query(
    `SELECT s.* FROM submissions s INNER JOIN agreements a ON s.AgreementId = a.id WHERE a.status IN ('in_progress') AND (a.BuyerId = ${req.user.userId} OR a.SupplierId = ${req.user.userId})
    AND s.paid = 0
    `
  );
  res.json(submissions);
};

module.exports = submissionCtrl;
