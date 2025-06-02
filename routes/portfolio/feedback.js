const express = require("express");
const router = express.Router();

router.post("/feedback", (req, res) => {
  const { name, email, message, captcha } = req.body;
});

module.exports = router;
