const { Router } = require("express");
const fetchUserSourcesByDateRange = require("../../utils/googleAnalytic");
const {
  listUserMessages,
  deleteUserMessage,
  handleLogin,
  verifyLogin,
} = require("../../controllers/portfolio/admin");
const router = Router();

router.get("/analytic", async (req, res) => {
  const data = await fetchUserSourcesByDateRange();
  return res.json(data);
});

router.get("/feedback", listUserMessages);
router.post("/feedback/delete", deleteUserMessage);

router.post("/login", handleLogin);
router.post("/verify", verifyLogin);

module.exports = router;
