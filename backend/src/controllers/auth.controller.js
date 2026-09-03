import User from "../models/User.js";

import * as otpService from "../services/otp.service.js";

import asyncHandler from "../utils/asynHandler.js";

import { sendOTPEmail } from "../services/email.service.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/token.service.js";


// ==========================================
// REGISTER USER
// ==========================================

export const register = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate OTP
  const otp = await otpService.generateOTPForUser(
    email,
    "EMAIL_VERIFICATION"
  );

  // Send OTP email
  await sendOTPEmail(email, otp);

  res.status(201).json({
    success: true,
    message: "Registration successful. OTP sent to your email.",

    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    },
  });

});


// ==========================================
// VERIFY EMAIL
// ==========================================

export const verifyEmail = asyncHandler(async (req, res) => {

  const { email, otp } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check already verified
  if (user.isEmailVerified) {
    return res.status(400).json({
      success: false,
      message: "Email is already verified",
    });
  }

  // Verify OTP
  const result = await otpService.verifyOTP(
    email,
    otp,
    "EMAIL_VERIFICATION"
  );

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  // Update user
  user.isEmailVerified = true;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });

});


// ==========================================
// RESEND EMAIL VERIFICATION OTP
// ==========================================

export const resendOTP = asyncHandler(async (req, res) => {

  const { email } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Check if already verified
  if (user.isEmailVerified) {
    return res.status(400).json({
      success: false,
      message: "Email is already verified",
    });
  }

  // Generate new OTP
  const otp = await otpService.generateOTPForUser(
    email,
    "EMAIL_VERIFICATION"
  );

  // Send email
  await sendOTPEmail(email, otp);

  res.status(200).json({
    success: true,
    message: "OTP resent successfully",
  });

});


// ==========================================
// LOGIN WITH EMAIL AND PASSWORD
// ==========================================

export const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Check email verification
  if (!user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email before logging in",
    });
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",

    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      accessToken,

      refreshToken,
    },
  });

});


// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================

export const refreshToken = asyncHandler(async (req, res) => {

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token is required",
    });
  }

  try {

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",

      data: {
        accessToken: newAccessToken,
      },
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });

  }

});


// ==========================================
// SEND LOGIN OTP
// ==========================================

export const sendLoginOTP = asyncHandler(async (req, res) => {

  const { email } = req.body;

  // Check user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found. Please register first.",
    });
  }

  // Check email verification
  if (!user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email first.",
    });
  }

  // Generate login OTP
  const otp = await otpService.generateOTPForUser(
    email,
    "LOGIN"
  );

  // Send OTP email
  await sendOTPEmail(email, otp);

  res.status(200).json({
    success: true,
    message: "Login OTP sent successfully",
  });

});


// ==========================================
// LOGIN WITH OTP
// ==========================================

export const loginWithOTP = asyncHandler(async (req, res) => {

  const { email, otp } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Verify OTP
  const result = await otpService.verifyOTP(
    email,
    otp,
    "LOGIN"
  );

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  // Generate JWT tokens
  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    success: true,
    message: "OTP login successful",

    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      accessToken,

      refreshToken,
    },
  });

});
// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  // Generate password reset OTP
  const otp = await otpService.generateOTPForUser(
    email,
    "FORGOT_PASSWORD"
  );

  // Send OTP email
  await sendOTPEmail(email, otp);

  res.status(200).json({
    success: true,
    message: "Password reset OTP sent successfully",
  });
});


// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Verify OTP
  const result = await otpService.verifyOTP(
    email,
    otp,
    "FORGOT_PASSWORD"
  );

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  // Update password
  // Your User model pre-save middleware should hash it using bcrypt
  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

// ==========================================
// SEND PHONE OTP
// ==========================================

export const sendPhoneOTP = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this phone number",
    });
  }

  const otp = await otpService.generateOTPForUser(
    phone,
    "PHONE_LOGIN"
  );

  /*
    For development:
    OTP will be returned in response.

    In production:
    Send OTP using Twilio or another SMS provider.
  */

  console.log("PHONE OTP:", otp);

  res.status(200).json({
    success: true,
    message: "Phone OTP generated successfully",

    // Remove this in production
    developmentOTP: otp,
  });
});


// ==========================================
// LOGIN WITH PHONE OTP
// ==========================================

export const loginWithPhoneOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const result = await otpService.verifyOTP(
    phone,
    otp,
    "PHONE_LOGIN"
  );

  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  // Mark phone verified
  user.isPhoneVerified = true;

  await user.save();

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    success: true,
    message: "Phone OTP login successful",

    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },

      accessToken,

      refreshToken,
    },
  });
});