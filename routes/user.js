const router = require("express").Router();
const {
  getUserControllerById,
  putUsrControllerById,
  patchUserControllerById,
  deleteUserControllerById,
  getAllUserController,
  createUserById,
} = require("../controller/user");

router.get("/:userId", getUserControllerById);

router.put("/:userId", putUsrControllerById);

router.patch("/:userId", patchUserControllerById);

router.delete("/:userId", deleteUserControllerById);

router.get("/", getAllUserController);

router.post("/", createUserById);

module.exports = router;
