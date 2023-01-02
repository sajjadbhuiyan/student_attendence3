const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");

router.use("/api/v1/auth", auth);
router.use("/api/v1/user", user);

module.exports = router;
