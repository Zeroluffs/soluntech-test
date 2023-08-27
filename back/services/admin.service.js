const { db, Orm } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const adminService = {};

adminService.getBestProfessions = async (start, end) => {
  const [result] = await db.query(`
  SELECT
    b.profession AS best_buyer_profession,
    SUM(sub.price) AS total_earned
  FROM
    agreements a
    JOIN submissions sub ON a.id = sub.AgreementId
    JOIN accounts b ON a.BuyerId = b.id
  WHERE
    sub.paymentDate BETWEEN '${start}' AND '${end}'
    AND sub.paid = 1
  GROUP BY
    b.profession
  ORDER BY
    total_earned DESC
  LIMIT 1
`);

  if (result.length === 0) {
    throw new CustomError("No submissions were paid in this period", 404);
  }

  return result[0];
};

adminService.getBestBuyers = async (start, end, limit) => {
  const [result] = await db.query(
    `SELECT b.id AS BuyerId, b.profession as BuyerProfession, b.firstName AS BuyerName, 
  ROUND(SUM(sub.price), 2) AS total_earned FROM agreements a 
  JOIN submissions sub ON a.id = sub.AgreementId 
  JOIN accounts b ON a.BuyerId = b.id 
  WHERE sub.paymentDate BETWEEN '${start}' AND '${end}' AND sub.paid = 1 
  GROUP BY b.id, b.id, b.profession 
  ORDER BY total_earned DESC 
  LIMIT ${limit}`
  );

  if (result.length === 0) {
    throw new CustomError("Could not find buyers", 404);
  }

  return result;
};

module.exports = adminService;
