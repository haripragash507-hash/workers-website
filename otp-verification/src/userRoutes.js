require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcrypt");
const { sendOTP } = require("./email"); // Import the sendOTP function from the new email.js file

// An object to store OTPs temporarily. In a real-world app, you'd use a database.
const otpStorage = {};

router.post("/signup", async (req, res) => {
  try {
    const { fullName, mobileNumber, email, password } = req.body;

    // Basic presence check
    if (!fullName || !mobileNumber || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }]
    });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email or mobile number already exists." });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP for", email, ":", otp);

    // Store the OTP and user data (not ideal for production)
    otpStorage[email] = {
      otp: otp,
      fullName: fullName,
      mobileNumber: mobileNumber,
      password: password,
      timestamp: Date.now()
    };

    // Send the email using the Nodemailer function
    try {
      await sendOTP(email, otp);
      console.log("Email sent successfully!");
      res.status(201).json({ message: "User signed up successfully! Check your email for OTP." });
    } catch (emailError) {
      console.error("Nodemailer email sending error:", emailError);
      res.status(500).json({ message: "Failed to send OTP email. Please try again." });
    }

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedData = otpStorage[email];
    if (!storedData || storedData.otp !== otp || (Date.now() - storedData.timestamp) > 300000) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const newUser = new User({
      fullName: storedData.fullName,
      mobileNumber: storedData.mobileNumber,
      email: email,
      password: storedData.password
    });
    
    await newUser.save();
    
    delete otpStorage[email];

    res.status(201).json({ message: "Email verified successfully! You can now sign in." });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

module.exports = router;
