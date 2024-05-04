const nodemailer = require("nodemailer");
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL_ADDRESS,
    pass: process.env.SENDER_MAIL_PASSWORD,
  },
});
const handleEmail = async (from, to, message, companyName, address, phoneNo) => {
  const htmlContent = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                </style>
            </head>
            <body>
                <h3>Job Offer from ${companyName}</h3>
                <p>${message}</p>
                <p>Contact us at:<br>
                Address: ${address}<br>
                Phone No: ${phoneNo}</p>
            </body>
        </html>
    `;
  try {
    const mailOptions = {
      from: from,
      to:to,
      subject:"JOb offer letter",
      html: htmlContent,
    };

    const result = await mailTransporter.sendMail(mailOptions);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = handleEmail;
