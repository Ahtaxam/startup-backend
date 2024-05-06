const nodemailer = require("nodemailer");
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL_ADDRESS,
    pass: process.env.SENDER_MAIL_PASSWORD,
  },
});
const sendInvestorEmail = async (from, to, message) => {
  try {
    const mailOptions = {
      from: from,
      to: to,
      subject: "Startup Discussion Opportunity",
      html: message,
    };

    const result = await mailTransporter.sendMail(mailOptions);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = sendInvestorEmail;
