const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paymentRoute = require("./routes/payment");
app.use("/payment", paymentRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
