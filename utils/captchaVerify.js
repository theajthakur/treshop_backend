const axios = require("axios");

async function verifyCaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!token) return false;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: secretKey,
        response: token,
      })
    );

    return response.data.success;
  } catch (err) {
    return false;
  }
}

module.exports = verifyCaptcha;
