const adminService = require("../services/admin.service");

const adminCtrl = {};

adminCtrl.getBestProfessions = async (req, res) => {
  const { start, end } = req.params;
  try {
    const bestProfession = await adminService.getBestProfessions(start, end);
    res.status(200).json(bestProfession);
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

module.exports = adminCtrl;
