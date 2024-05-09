const handleEmail = require("../utils/sendEmail");
const sendInvestorEmail = require("../utils/sendInvestorEmail");


// controller to send email to student for job offer
const sendEmailController = async (req, res, next) => {
  const { email, student, message, companyName, address, phoneNo } = req.body;
  try {
    const response = await handleEmail(
      email,
      student,
      message,
      companyName,
      address,
      phoneNo
    );
    res.status(200).json({
      message: "offer sent successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// controller for sending email student to investor or vice versa
const sendInvestorEmailController = async (req, res) => {
  const { sender, receiver, subject, message } = req.body;
  try {
    const response = await sendInvestorEmail(sender, receiver,subject, message);
    res.status(200).json({
      message: "message sent successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {sendEmailController, sendInvestorEmailController};
