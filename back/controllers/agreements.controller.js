const { db, Orm } = require("../lib/orm");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Agreement } = require("../models/agreement");

const agreementCtrl = {};

agreementCtrl.getAgreementById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const agreement = await db.query(
    `SELECT * FROM agreements WHERE id = ${id} AND (BuyerId = ${userId} OR SupplierId = ${userId})`
  );
  res.json(agreement);
};

agreementCtrl.getAgreements = async (req, res) => {
  const agreements = await db.query(
    `SELECT * FROM agreements WHERE status IN ('new', 'in_progress') AND (BuyerId = ${req.user.userId} OR SupplierId = ${req.user.userId})
    `
  );
  if (agreements.length > 0) {
    res.json(agreements);
  } else {
    res.status(200).send([]);
  }
};

module.exports = agreementCtrl;
