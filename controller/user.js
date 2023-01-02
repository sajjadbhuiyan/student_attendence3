const User = require("../model/User");
const {
  findAllUserService,
  findUserByProperty,
  putUserService,
  patchUserService,
  createNewUser,
  deleteUserByIdService,
} = require("../services/user");
const error = require("../util/error");

const getUserControllerById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    let user = await findUserByProperty("_id", userId);
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      accountStatus: user.accountStatus,
    };
    return res.status(200).json({ message: "Specific User", user });
  } catch (error) {
    next(error);
  }
};

const putUsrControllerById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, roles, accountStatus } = req.body;
  try {
    const user = await putUserService(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error("User not found", 400);
    }

    return res
      .status(200)
      .json({ message: "Total User Update properly", user });
  } catch (error) {
    next(error);
  }
};

const patchUserControllerById = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await patchUserService(userId, { name, roles, accountStatus });
    return res
      .status(200)
      .json({ message: "Specific user property update", user });
  } catch (error) {
    next(error);
  }
};

const deleteUserControllerById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await deleteUserByIdService(userId);
    return res.status(200).json({ message: "User Delete Successfully", user });
  } catch (error) {
    next(error);
  }
};

const getAllUserController = async (req, res, next) => {
  try {
    const allUser = await findAllUserService();
    res.status(200).json({ message: "All User", allUser });
  } catch (error) {
    next(error);
  }
};

const createUserById = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await createNewUser({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res
      .status(201)
      .json({ message: "User Created by Dashboard Controller", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserControllerById,
  putUsrControllerById,
  patchUserControllerById,
  deleteUserControllerById,
  getAllUserController,
  createUserById,
};
