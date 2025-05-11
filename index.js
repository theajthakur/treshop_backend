const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paymentRoute = require("./routes/payment");
app.use("/payment", paymentRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
