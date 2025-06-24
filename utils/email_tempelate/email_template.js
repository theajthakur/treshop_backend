const handlePortfolioEmail = (sender = "NA", message = "NA") => {
  const gmail = `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>New Message Received</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            padding: 30px;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          h2 {
            color: #222;
          }
          .message-box {
            background-color: #f1f1f1;
            padding: 15px;
            border-left: 4px solid #007BFF;
            margin: 20px 0;
            white-space: pre-line;
          }
          .btn {
            display: inline-block;
            background-color: #007BFF;
            color: #fff !important;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
          }
          .img{
            text-align: center;
          }
          .img img{
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>📬 New Message from ${sender}</h2>
          <p>You just received a new message:</p>
          <div class="message-box">${message}</div>
          <p>
            <a href="https://theajthakur.vercel.app/admin/message" class="btn">Open Message in Admin Panel</a>
          </p>
          <div class="footer">
            You’re receiving this email because someone contacted you via your website.<br/>
            Do not share this email with anyone.
          </div>
        </div>
      </body>
      </html>
    `;

  return gmail;
};

const handleAdminReply = (user = "NA", message = "") => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Admin Reply</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f0f2f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .email-container {
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        }
        .header {
          background: linear-gradient(135deg, #007BFF, #00C6FF);
          padding: 30px 20px;
          color: white;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
        }
        .content {
          padding: 30px 25px;
          color: #333;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          margin: 15px 0;
        }
        .reply-box {
          background-color: #f8f9fa;
          border-left: 4px solid #007BFF;
          padding: 15px;
          font-style: italic;
          color: #444;
          margin: 20px 0;
          border-radius: 6px;
        }
        .cta-button {
          display: inline-block;
          margin-top: 25px;
          padding: 12px 24px;
          background-color: #007BFF;
          color: #fff !important;
          text-decoration: none;
          font-weight: bold;
          border-radius: 6px;
          transition: background 0.3s ease;
        }
        .cta-button:hover {
          background-color: #0056d2;
        }
        .footer {
          background-color: #f1f1f1;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #777;
        }
        @media screen and (max-width: 620px) {
          .email-container {
            width: 100%;
            margin: 15px;
          }
          .header h1 {
            font-size: 22px;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>

      <div class="email-container">
        <div class="header">
          <h1>You’ve Got a Reply!</h1>
        </div>
        <div class="content">
          <p>Hi ${user},</p>
          <p>Thanks for reaching out! Here's a reply to your message from the Admin:</p>
          
          <div class="reply-box">
            “${message}”
          </div>

          <p>If you have any more questions, feel free to get in touch again.</p>

          <a href="https://theajthakur.vercel.app/" class="cta-button">Reply Now</a>

          <p style="margin-top: 40px;">Warm regards,<br><strong>Vijay Singh</strong><br>Web Developer | Freelancer</p>
        </div>
        <div class="footer">
          &copy; 2024-25 <a href="https://theajthakur.vercel.app/">Vijay Singh</a>. All rights reserved.
        </div>
      </div>

    </body>
    </html>`;

  return html;
};

const HandleUserMessageConfirmation = (user = "user") => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Message Received</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f5f7fb;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 30px auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #4e54c8, #8f94fb);
      padding: 30px;
      text-align: center;
      color: white;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 30px 25px;
      color: #333;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      margin: 20px 0;
    }
    .email-body .highlight {
      background-color: #f0f0f5;
      padding: 12px 18px;
      border-left: 4px solid #4e54c8;
      border-radius: 6px;
      font-style: italic;
      color: #555;
    }
    .email-footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 20px;
      background: #f1f1f1;
    }
    @media only screen and (max-width: 620px) {
      .email-wrapper {
        margin: 15px;
        width: auto;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h1>Message Received!</h1>
    </div>
    <div class="email-body">
      <p>Hi ${user},</p>
      <p>
        Thanks for reaching out through my portfolio. I’ve received your message and will get back to you as soon as possible.
      </p>
      <div class="highlight">
        “Your message is important — I’ll reply shortly.”
      </div>
      <p>Looking forward to assisting you.</p>
      <p>Best regards,<br><strong>Vijay Thakur</strong><br>Full Stack Web Developer | Freelancer</p>
    </div>
    <div class="email-footer">
      &copy; [Year] Vijay Thakur. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
  return html;
};

module.exports = {
  handlePortfolioEmail,
  handleAdminReply,
  HandleUserMessageConfirmation,
};
