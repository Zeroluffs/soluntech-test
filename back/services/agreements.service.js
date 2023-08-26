const { db, Orm } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const { Agreement } = require("../models/agreement");
const agreementsService = {};

agreementsService.getAgreementById = async (agreementId, userId) => {
  const [agreement] = await db.query(
    `SELECT * FROM agreements WHERE id = ${agreementId} AND (BuyerId = ${userId} OR SupplierId = ${userId})`
  );
  if (agreement.length === 0) {
    throw new CustomError("No Agreements", 404);
  }
  return agreement;
};

agreementsService.getUserAgreements = async (userId) => {
  const agreements = await Agreement.findAll({
    where: {
      status: ["new", "in_progress"],
      [Orm.Op.or]: [{ BuyerId: userId }, { SupplierId: userId }],
    },
  });

  if (agreements.length === 0) {
    throw new CustomError("No Agreements", 404);
  }

  return agreements;
};
module.exports = agreementsService;
