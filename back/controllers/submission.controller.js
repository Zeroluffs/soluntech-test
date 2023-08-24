const { db } = require("../lib/orm");
const {
  getUnpaidSubmissions,
  paySubmission,
} = require("./submission.controller");

const submissionCtrl = {};

submissionCtrl.getUnpaidSubmissions = async (req, res) => {
  const { userId } = req.user;
  try {
    const submissions = await getUnpaidSubmissions(userId);
    res.json(submissions);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

submissionCtrl.paySubmission = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const { userId } = req.user;

  try {
    await paySubmission(id, price, userId);
    res.json({ message: "Payment successful" });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = submissionCtrl;
