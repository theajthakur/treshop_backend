const express = require("express");

const router = express.Router();
const { handleChat } = require("../../controllers/chatbots/portfolio");
const { handleSendFeedback } = require("../../controllers/portfolio/user");

router.get("/feedback", async (req, res) => {
  return res.json({ status: "success", message: "Feedback API" });
});

router.post("/feedback", handleSendFeedback);

router.post("/chatbot", handleChat);

module.exports = router;
