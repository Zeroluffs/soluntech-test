const { db } = require("../lib/orm");
const CustomError = require("../classUtils/CustomError");
const { Submission } = require("../models/submissions");
const { Account } = require("../models/accounts");
const { Agreement } = require("../models/agreement");
const balancesService = {};

balancesService.depositBuyerMoney = async (accountId, amount, userId) => {
  const transaction = await db.transaction();

  try {
    const account = await Account.findOne({
      where: {
        id: accountId,
        type: "buyer",
      },
      transaction,
    });

    if (!account) {
      throw new CustomError("Account not found", 404);
    }

    const submissions = await Submission.findAll({
      include: {
        model: Agreement,
        where: {
          status: ["in_progress", "new"],
          BuyerId: userId,
        },
      },
      where: {
        paid: 0,
      },
      transaction,
    });

    if (!submissions || submissions.length === 0) {
      throw new CustomError(
        "No unpaid submissions found so you cannot deposit money",
        404,
      );
    }

    const totalPrice = submissions.reduce((acc, submission) => {
      return acc + submission.price;
    }, 0);

    const tenPercent = totalPrice * 0.1;
    if (amount > tenPercent) {
      throw new CustomError("You cannot deposit that amount", 400);
    }

    account.balance += amount;
    await account.save({ transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = balancesService;
