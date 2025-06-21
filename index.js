const express = require("express");
const app = express();
const port = 4000;
const connectDB = require("./utils/db");

const cors = require("cors");

require("dotenv").config();

app.use(cors(["localhost:5173"]));
connectDB();

const pingServer = async () => {
  let SERVER_URL = "";
  try {
    SERVER_URL = `${process.env.APP_URL}/api`;
    console.log(`Attempt Pinging to ${SERVER_URL}`);
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    console.log("Connected to Server!");
    return data;
  } catch (error) {
    console.log(error);
    console.log(`Failed pinging: ${SERVER_URL}`);
    return {
      status: "error",
      message: error.message || "Server Failed to connect",
    };
  }
};

pingServer();

setInterval(pingServer, 1000 * 60);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const paymentRoute = require("./routes/payment");
const apiRoutes = require("./routes/api");

app.use("/payment", paymentRoute);
app.use("/api", apiRoutes);
app.use("/api/chatbot", require("./routes/chatbot"));
app.use("/api/portfolio/admin", require("./routes/portfolio/admin"));
app.use("/api/portfolio", require("./routes/portfolio/master"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
