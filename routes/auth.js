const router = require("express").Router();

router.post("/register", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ message: "this is register router" });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ message: "this is login router" });
});

module.exports = router;
