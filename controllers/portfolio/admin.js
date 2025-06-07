const Contact = require("../../models/Contact");
const jwt = require("jsonwebtoken");
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

module.exports = {
  listUserMessages,
  deleteUserMessage,
  handleLogin,
  verifyLogin,
};
