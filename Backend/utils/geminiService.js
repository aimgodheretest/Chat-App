const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Predictive Typing
const getPrediction = async (text) => {
  try {
    const prompt = `
You are a chat assistant.

Complete the following sentence in exactly 3 different short ways.

Rules:
- Return ONLY a JSON array.
- No markdown.
- No explanation.
- Each suggestion must be less than 5 words.

Input:
"${text}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const result =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "[]";

    return JSON.parse(result);
  } catch (err) {
    console.log("Prediction AI Error:", err);

    return [];
  }
};

// Smart Replies
const getReplies = async (message) => {
  try {
    const prompt = `
You are a chat assistant.

Suggest exactly 3 smart replies.

Rules:
- Return ONLY a JSON array.
- Keep replies under 8 words.
- No markdown.
- No numbering.

Incoming Message:
"${message}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const result =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "[]";

    return JSON.parse(result);
  } catch (err) {
    console.log("Reply AI Error:", err);

    return [];
  }
};

module.exports = {
  getPrediction,
  getReplies,
};
