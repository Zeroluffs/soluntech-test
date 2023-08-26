const CustomError = require("../classUtils/CustomError");
const {
  getAgreementById,
  getUserAgreements,
} = require("../services/agreements.service");

const agreementCtrl = {};

agreementCtrl.getAgreementById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const agreement = await getAgreementById(id, userId);
    res.json(agreement);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

agreementCtrl.getAgreements = async (req, res) => {
  const { userId } = req.user;
  try {
    const agreements = await getUserAgreements(userId);
    res.json(agreements);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = agreementCtrl;
