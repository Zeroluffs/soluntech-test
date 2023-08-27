const submissionsService = require("../services/submissions.service");
const CustomError = require("../classUtils/CustomError");
const { Agreement } = require("../models/agreement");
const { Submission } = require("../models/submissions");
const { Orm, db } = require("../lib/orm");
const { Account } = require("../models/accounts");

describe("submissionsService.getUnpaidSubmissionsPerUser", () => {
  it("should return unpaid submissions for a user", async () => {
    const userId = 123;
    const mockSubmissions = [
      { paid: 0, Agreement: { status: "in_progress", BuyerId: userId } },
      { paid: 0, Agreement: { status: "in_progress", SupplierId: userId } },
    ];

    Submission.findAll = jest.fn().mockResolvedValue(mockSubmissions);

    const result = await submissionsService.getUnpaidSubmissionsPerUser(userId);

    expect(result).toEqual(mockSubmissions);
    expect(Submission.findAll).toHaveBeenCalledWith({
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
  });

  it("should throw CustomError when no unpaid submissions are found", async () => {
    const userId = 123;
    Submission.findAll = jest.fn().mockResolvedValue([]);

    await expect(
      submissionsService.getUnpaidSubmissionsPerUser(userId)
    ).rejects.toThrow(new CustomError("No submissions", 404));
  });

  it("should handle errors", async () => {
    const userId = 123;
    Submission.findAll = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    await expect(
      submissionsService.getUnpaidSubmissionsPerUser(userId)
    ).rejects.toThrowError("Database error");
  });
});
