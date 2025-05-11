require("dotenv").config();
const express = require("express");
const router = express.Router();

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  if (!amount)
    return res
      .status(400)
      .json({ status: "error", message: "No Amount Found!" });
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

module.exports = router;
