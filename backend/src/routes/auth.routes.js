import express from "express";

import {
  register,
  verifyEmail,
  resendOTP,
  login,
  refreshToken,
  sendLoginOTP,
  loginWithOTP,
  forgotPassword,
  resetPassword,
  sendPhoneOTP,
  loginWithPhoneOTP,

} from "../controllers/auth.controller.js";
import {
  authLimiter,
  otpLimiter,
} from "../middleware/rateLimit.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  verifyEmailSchema,
  resendOTPSchema,
  loginSchema,
  refreshTokenSchema,
  sendLoginOTPSchema,
  loginWithOTPSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginWithPhoneOTPSchema,
  sendPhoneOTPSchema,
  
  
} from "../validators/auth.validator.js";

const router = express.Router();


// REGISTER
router.post(
  "/register",
  validate(registerSchema),
  register
);


// VERIFY EMAIL
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  verifyEmail
);


// RESEND OTP
router.post(
  "/resend-otp",
  validate(resendOTPSchema),
  resendOTP
);


// LOGIN WITH PASSWORD
router.post(
  "/login",
  validate(loginSchema),
  login
);


// REFRESH TOKEN
router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  refreshToken
);


// SEND LOGIN OTP
router.post(
  "/send-login-otp",
  validate(sendLoginOTPSchema),
  sendLoginOTP
);


// LOGIN WITH OTP
router.post(
  "/login-with-otp",
  validate(loginWithOTPSchema),
  loginWithOTP
);

// FORGOT PASSWORD
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);


// RESET PASSWORD
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);
router.post(
  "/resend-otp",
  otpLimiter,
  validate(resendOTPSchema),
  sendLoginOTP
);
router.post(
  "/resend-otp",
  otpLimiter,
  validate(resendOTPSchema),
  resendOTP
);

router.post(
  "/forgot-password",
  otpLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);
// SEND PHONE OTP
router.post(
  "/send-phone-otp",
  otpLimiter,
  validate(sendPhoneOTPSchema),
  sendPhoneOTP
);


// LOGIN WITH PHONE OTP
router.post(
  "/login-with-phone-otp",
  authLimiter,
  validate(loginWithPhoneOTPSchema),
  loginWithPhoneOTP
);

export default router;