const { db } = require("../lib/orm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../classUtils/CustomError");
const userService = require("../services/user.service");

describe("userService.getAllUsers", () => {
  it("should return all users", async () => {
    const mockUsers = [
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
    ];
    db.query = jest.fn().mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM accounts");
  });
});

describe("userService.Login", () => {
  it("should return JWT token when valid credentials are provided", async () => {
    const mockUser = {
      id: 1,
      username: "testuser",
      password: "hashedpassword",
      profession: "developer",
      balance: 100,
      type: "buyer",
    };
    db.query = jest.fn().mockResolvedValue([mockUser]);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue("mocked.token");

    const token = await userService.Login("testuser", "password");

    expect(token).toBe("mocked.token");
    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM accounts WHERE username = 'testuser'`
    );
    expect(bcrypt.compare).toHaveBeenCalledWith("password", mockUser.password); // Compare with hashed password
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        userId: mockUser.id,
        username: mockUser.username,
        profession: mockUser.profession,
        balance: mockUser.balance,
        role: mockUser.type,
      },
      "secret",
      { expiresIn: "2h" }
    );
  });

  it("should throw CustomError when invalid credentials are provided", async () => {
    db.query = jest.fn().mockResolvedValue([]);

    await expect(
      userService.Login("invaliduser", "invalidpass")
    ).rejects.toThrow(new CustomError("Invalid Credentials", 400));
  });

  it("should throw CustomError when no input is provided", async () => {
    await expect(userService.Login("", "")).rejects.toThrow(
      new CustomError("All input is required", 400)
    );
  });
  it("should throw CustomError when invalid credentials are provided", async () => {
    db.query = jest.fn().mockResolvedValue([]);

    await expect(
      userService.Login("invaliduser", "invalidpass")
    ).rejects.toThrow(new CustomError("Invalid Credentials", 400));
  });
});
