const Contact = require("../../models/Contact");
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

module.exports = { listUserMessages, deleteUserMessage };
