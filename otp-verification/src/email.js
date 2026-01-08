const nodemailer = require("nodemailer");

// Create a transporter object using a service like Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address from .env file
    pass: process.env.EMAIL_PASS, // Your app password from .env file
  },
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Quick Services: Your OTP for Email Verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #0056b3;">Quick Services OTP Verification</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>
        <h3 style="background-color: #f0f0f0; padding: 10px 20px; border-radius: 5px; text-align: center; color: #000; letter-spacing: 2px;">${otp}</h3>
        <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    // Rethrow the error so it can be caught in the calling function
    throw error;
  }
};

module.exports = { sendOTP };
