const handleEmail = require("../utils/sendEmail");
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
        message:"offer sent successfully",
        status:200
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = sendEmailController;
