const express = require("express");

const router = express.Router();

const aiController = require("../Controllers/aiController");

router.post("/predict", aiController.predictText);
router.post("/reply", aiController.smartReplies);

module.exports = router;
