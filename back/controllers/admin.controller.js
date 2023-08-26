const CustomError = require("../classUtils/CustomError");
const adminService = require("../services/admin.service");

const adminCtrl = {};

adminCtrl.getBestProfessions = async (req, res) => {
  const { start, end } = req.params;
  try {
    const bestProfession = await adminService.getBestProfessions(start, end);
    res.status(200).json(bestProfession);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

adminCtrl.getBestBuyers = async (req, res) => {
  const { start, end, limit } = req.params;
  try {
    const bestBuyers = await adminService.getBestBuyers(start, end, limit);
    res.status(200).json(bestBuyers);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message });
    } else {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = adminCtrl;
