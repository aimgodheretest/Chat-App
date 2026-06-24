const express = require("express");
const multer = require("multer");

const router = express.Router();

const { uploadMedia } = require("../Controllers/mediaController");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("file"), uploadMedia);

module.exports = router;
