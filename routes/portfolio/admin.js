const { Router } = require("express");
const fetchUserSourcesByDateRange = require("../../utils/googleAnalytic");
const { listUserMessages } = require("../../controllers/portfolio/admin");
const router = Router();

router.get("/analytic", async (req, res) => {
  const data = await fetchUserSourcesByDateRange();
  return res.json(data);
});

router.get("/feedback", listUserMessages);

module.exports = router;
