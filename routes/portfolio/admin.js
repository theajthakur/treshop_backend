const { Router } = require("express");
const fetchUserSourcesByDateRange = require("../../utils/googleAnalytic");
const router = Router();

router.get("/analytic", async (req, res) => {
  const data = await fetchUserSourcesByDateRange();
  return res.json(data);
});

module.exports = router;
