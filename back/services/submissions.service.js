const { db, Orm } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const { Agreement } = require("../models/agreement");
const { Account } = require("../models/accounts");
const { Submission } = require("../models/submissions");
const submissionsService = {};

submissionsService.getUnpaidSubmissionsPerUser = async (userId) => {
  const submissions = await Submission.findAll({
    where: {
      paid: 0,
    },
    include: {
      model: Agreement,
      where: {
        status: "in_progress",
        [Orm.Op.or]: [{ BuyerId: userId }, { SupplierId: userId }],
      },
    },
  });

  if (submissions.length === 0) {
    throw new CustomError("No submissions", 404);
  }

  return submissions;
};

submissionsService.payUserSubmission = async (id, price, userId) => {
  const transaction = await db.transaction();

  try {
    const buyer = await Account.findOne({
      where: {
        id: userId,
        type: "buyer",
      },
      transaction,
    });

    const agreement = await Agreement.findOne({
      where: {},
      include: {
        model: Submission,
        where: {
          id,
          paid: 0,
        },
      },
      transaction,
    });

    if (!agreement) {
      throw new CustomError("No submissions", 404);
    }

    const supplier = await Account.findOne({
      where: {
        id: agreement.SupplierId,
        type: "supplier",
      },
      transaction,
    });

    if (buyer.balance < price) {
      throw new CustomError("Insufficient Funds", 400);
    }

    await Promise.all([
      buyer.update({ balance: buyer.balance - price }, { transaction }),
      supplier.update({ balance: supplier.balance + price }, { transaction }),
      agreement.update({ status: "terminated" }, { transaction }),
      agreement.Submissions[0].update({ paid: 1 }, { transaction }),
    ]);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
module.exports = submissionsService;
