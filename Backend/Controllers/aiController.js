const { getPrediction, getReplies } = require("../Utils/geminiService");

// Predictive Typing
const predictText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const suggestions = await getPrediction(text);

    res.status(200).json({
      suggestions,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Smart Replies
const smartReplies = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const replies = await getReplies(message);

    res.status(200).json({
      replies,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  predictText,
  smartReplies,
};
