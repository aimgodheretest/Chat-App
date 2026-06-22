const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { sendMessage, getMessages } = require("../Controllers/chatController");

router.post("/message", auth, sendMessage);
router.get("/messages", auth, getMessages);

module.exports = router;
