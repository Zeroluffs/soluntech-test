const { db, Orm } = require("../lib/orm");

const adminCtrl = {};

adminCtrl.getBestProfessions = async (req, res) => {
  const { start, end } = req.params;
  console.log(req.query);
  console.log(start, end);
  // const [result] = await db.query(
  //   `b.profession AS best_buyer_profession, SUM(sub.price) AS total_earned FROM agreement a JOIN submission sub ON a.id = sub.AgreementId JOIN accounts s ON a.BuyerId = b.id WHERE sub.paymentDate BETWEEN :'2022-04-27 03:10:11.000 +00:00' AND :'2022-05-03 12:00:07.000 +00:00' AND sub.paid = 1 GROUP BY b.profession ORDER BY total_earned DESC LIMIT 10`,
  // );

  // const [result] = await db.query(
  //   `SELECT b.profession AS best_buyer_profession, SUM(sub.price) AS total_earned FROM agreements a JOIN submissions sub ON a.id = sub.AgreementId JOIN accounts b ON a.BuyerId = b.id WHERE sub.paymentDate BETWEEN '2022-04-27 03:10:11.000 +00:00' AND '2022-05-03 12:00:07.000 +00:00' AND sub.paid = 1 GROUP BY b.profession ORDER BY total_earned DESC LIMIT 10`,
  // );
  const [result] = await db.query(
    `SELECT b.profession AS best_buyer_profession, SUM(sub.price) AS total_earned FROM agreements a JOIN submissions sub ON a.id = sub.AgreementId JOIN accounts b ON a.BuyerId = b.id WHERE sub.paymentDate BETWEEN '${start}' AND '${end}' AND sub.paid = 1 GROUP BY b.profession ORDER BY total_earned DESC LIMIT 10`
  );
  res.json({
    result,
  });
};

module.exports = adminCtrl;
