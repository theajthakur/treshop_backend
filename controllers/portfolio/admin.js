const Contact = require("../../models/Contact");
const jwt = require("jsonwebtoken");
const {
  handleAdminReply,
} = require("../../utils/email_tempelate/email_template");
const sendEmailSMTP = require("../../utils/emailSender");
const listUserMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserMessage = async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.json({ status: "success", message: "Missing _id" });

  try {
    await Contact.findByIdAndDelete(_id);
    return res.json({ status: "success", message: "Deleted Successfully!" });
  } catch (error) {
    if (!_id)
      return res.json({
        status: "success",
        message: "Cannot Delete the message!",
      });
  }
};

const handleLogin = async (req, res) => {
  const { password } = req.body;
  if (!password)
    return res.json({ status: "error", message: "Enter your password!" });

  const adminPass = process.env.ADMIN_PASSWORD;

  if (password != adminPass)
    return res.json({ status: "error", message: "Invalid Password!" });

  const token = jwt.sign(adminPass, process.env.JWT_SECRET_KEY);

  return res.json({
    status: "success",
    message: "Logged in successfully!",
    token,
  });
};

const verifyLogin = async (req, res) => {
  let { password } = req.body;
  if (!password)
    return res.json({ status: "error", message: "Enter your password!" });

  const adminPass = process.env.ADMIN_PASSWORD;

  password = jwt.verify(password, process.env.JWT_SECRET_KEY);

  if (password !== adminPass)
    return res.json({ status: "error", message: "Invalid Password" });

  return res.json({ status: "success", message: "Login Successful" });
};

const handleReplyUser = async (req, res) => {
  try {
    const { reply, _id } = req.body;

    if (!reply || !_id) {
      return res.status(400).json({
        status: "error",
        message: "Reply message and user ID are required.",
      });
    }

    const user = await Contact.findById(_id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (!user.email) {
      return res.status(400).json({
        status: "error",
        message: "User does not have a valid email address.",
      });
    }

    // Update the reply in the database
    const updateResult = await Contact.updateOne({ _id }, { $set: { reply } });

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({
        status: "error",
        message: "Failed to update reply in database.",
      });
    }

    // Send the email
    const emailSent = await sendEmailSMTP(
      user.email,
      "Vijay Thakur",
      "Reply from Vijay Thakur - Full Stack Web Developer | Freelancer",
      handleAdminReply(user.name, reply)
    );

    if (!emailSent) {
      return res.status(500).json({
        status: "error",
        message: "Failed to send reply email to the user.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Reply sent successfully.",
    });
  } catch (err) {
    console.error("Error in handleReplyUser:", err);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred.",
    });
  }
};

module.exports = {
  listUserMessages,
  deleteUserMessage,
  handleLogin,
  verifyLogin,
  handleReplyUser,
};
