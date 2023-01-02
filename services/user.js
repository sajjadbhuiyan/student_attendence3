const User = require("../model/User");
const error = require("../util/error");

const findAllUserService = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  } else {
    return User.findOne({ [key]: value });
  }
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const putUserService = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("Email already Use, you can not change email", 400);
  }

  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

const patchUserService = async (id, { name, roles, accountStatus }) => {
  let user = await findUserByProperty("_id", id);

  if (!user) {
    throw error("User not found", 400);
  }

  user.name = name ?? user.name;
  user.roles = roles ?? user.roles;
  user.accountStatus = accountStatus ?? user.accountStatus;

  return user.save();
};

const deleteUserByIdService = async (id) => {
  let user = await findUserByProperty("_id", id);
  if (!user) {
    throw error("User not found", 400);
  }

  return user.remove();
};

module.exports = {
  findAllUserService,
  findUserByProperty,
  createNewUser,
  putUserService,
  patchUserService,
  deleteUserByIdService,
};
