const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const error = require("../util/error");
const { createNewUser, findUserByProperty } = require("./user");

const registerService = async ({ name, email, password }) => {
  try {
    let user = await findUserByProperty("email", email);
    if (user) {
      throw error("User already exist", 401);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    createNewUser({ name, email, password: hash });
  } catch (error) {
    console.log(error);
  }
};

const loginService = async ({ email, password }) => {
  try {
    let user = await findUserByProperty(email, "email");
    if (!user) {
      throw error("Invalid Cradential", 400);
    }

    const decode = await bcrypt.compare(password, user.password);
    if (!decode) {
      throw error("Invalid Cradential", 400);
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      accountStatus: user.accountStatus,
    };

    return (token = jwt.sign(payload, "secret-key", { expiresIn: "2h" }));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerService, loginService };
