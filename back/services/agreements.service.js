const { db } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const agreementsService = {};

agreementsService.getAgreementById = async (agreementId, userId) => {
  const [agreement] = await db.query(
    `SELECT * FROM agreements WHERE id = ${agreementId} AND (BuyerId = ${userId} OR SupplierId = ${userId})`,
  );
  if (agreement.length === 0) {
    throw new CustomError("No Agreements", 404);
  }
  return agreement;
};

agreementsService.getUserAgreements = async (userId) => {
  const [agreements] = await db.query(
    `SELECT * FROM agreements WHERE status IN ('new', 'in_progress') AND (BuyerId = ${userId} OR SupplierId = ${userId})
        `,
  );
  if (agreements.length === 0) {
    throw new CustomError("No Agreements", 404);
  }
  return agreements;
};

module.exports = agreementsService;
