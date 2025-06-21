const nodemailer = require("nodemailer");

async function sendEmailSMTP(receiver, sender = "Admin", subject, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Or 587 if using TLS
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_EMAIL, // your email
      pass: process.env.SMTP_PASSWORD, // app password (not your actual password)
    },
  });

  const mailOptions = {
    from: `${sender} <vijaysingh.handler@gmail.com>`, // Sender name/email
    to: receiver,
    subject,
    html, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmailSMTP;
