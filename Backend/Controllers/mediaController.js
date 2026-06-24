const uploadToS3 = require("../utils/s3Service");

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileUrl = await uploadToS3(req.file);

    res.status(200).json({
      fileUrl,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};

module.exports = {
  uploadMedia,
};
