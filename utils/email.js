const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL_ID,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html, title = "Admin") => {
  try {
    const mailOptions = {
      from: `"${title}" <${process.env.SMTP_EMAIL_ID}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
