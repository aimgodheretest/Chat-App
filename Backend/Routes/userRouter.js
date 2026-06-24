const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  findUserByEmail,
} = require("../Controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/find/:email", findUserByEmail);

module.exports = router;
