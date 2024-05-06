const handleEmail = require("../utils/sendEmail");
const sendInvestorEmail = require("../utils/sendInvestorEmail");

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
    console.log(response);
    res.status(200).json({
      message: "offer sent successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const sendInvestorEmailController = async (req, res) => {
  const { investor, student, message } = req.body;
  try {
    const response = await sendInvestorEmail(investor, student, message);
    console.log(response);
    res.status(200).json({
      message: "message sent successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {sendEmailController, sendInvestorEmailController};
