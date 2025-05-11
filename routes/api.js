const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ status: "success", message: "API is Working" });
});

module.exports = router;
