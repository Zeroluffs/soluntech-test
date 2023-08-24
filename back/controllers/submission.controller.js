const {
  getUnpaidSubmissionsPerUser,
  payUserSubmission,
} = require("../services/submissions.service");

const submissionCtrl = {};

submissionCtrl.getUnpaidSubmissions = async (req, res) => {
  const { userId } = req.user;
  try {
    const submissions = await getUnpaidSubmissionsPerUser(userId);
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
    await payUserSubmission(id, price, userId);
    res.json({ message: "Payment successful" });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = submissionCtrl;
