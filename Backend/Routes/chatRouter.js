const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { sendMessage } = require("../Controllers/chatController");

router.post("/message", auth, sendMessage);

module.exports = router;
