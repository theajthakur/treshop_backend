const express = require("express");
const verifyCaptcha = require("../../utils/captchaVerify");
const Contact = require("../../models/Contact");
const router = express.Router();
const { handleChat } = require("../../controllers/chatbots/portfolio");

router.get("/feedback", async (req, res) => {
  return res.json({ status: "success", message: "Feedback API" });
});

router.post("/feedback", async (req, res) => {
  const { name, email, mobile, message, captcha } = req.body;
  if (!name || !email || !message || !captcha)
    return res.json({ status: "error", message: "Please fill all fields" });
  const captchaResponse = verifyCaptcha(captcha);
  if (!captchaResponse)
    return res.json({ status: "error", message: "Invalid Captcha!" });

  const contact = new Contact({ name, mobile, email, message });
  if (!contact)
    return res.json({ status: "error", message: "Failed to save contact" });

  try {
    await contact.save();
    res.json({ status: "success", message: "Contact saved successfully" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to save contact" });
  }
});

router.post("/chatbot", handleChat);

module.exports = router;
