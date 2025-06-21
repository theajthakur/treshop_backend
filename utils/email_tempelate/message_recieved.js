const handlePortfolioEmail = (sender = "NA", message = "NA") => {
  const gmail = `<!DOCTYPE html>
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
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h2>📬 New Message from ${sender}</h2>
                      <p>You just received a new message:</p>
                      <div class="message-box">
                        ${message}
                      </div>
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

module.exports = handlePortfolioEmail;
