const {
  HandleUserMessageConfirmation,
} = require("../../utils/email_tempelate/email_template");
const sendEmailSMTP = require("../../utils/emailSender");
const verifyCaptcha = require("../../utils/captchaVerify");
const Contact = require("../../models/Contact");
const {
  handlePortfolioEmail,
} = require("../../utils/email_tempelate/email_template");

const handleSendFeedback = async (req, res) => {
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
    await sendEmailSMTP(
      "thakurvijayofficial@gmail.com",
      "Portfolio",
      "Message Received",
      handlePortfolioEmail(name, message.substr(0, 100))
    );
    await sendEmailSMTP(
      email,
      "Vijay Thakur",
      "Message received by Vijay Singh",
      HandleUserMessageConfirmation(name)
    );
    res.json({ status: "success", message: "Contact saved successfully" });
  } catch (error) {
    res.json({ status: "error", message: "Failed to save contact" });
  }
};

module.exports = { handleSendFeedback };
