const { handleChat } = require("../controllers/chatbots/portfolio");
const express = require("express");

const route = express.Router();

route.post("/portfolio", handleChat);

module.exports = route;
