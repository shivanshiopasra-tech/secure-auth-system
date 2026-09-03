import OTP from "../models/OTP.js";

import generateOTP from "../utils/generateOtp.js";

const OTP_EXPIRY_MINUTES =
  Number(process.env.OTP_EXPIRY_MINUTES) || 10;


// ================================
// GENERATE OTP
// ================================

export const generateOTPForUser = async (
  email,
  type = "EMAIL_VERIFICATION"
) => {

  // Delete previous OTP
  await OTP.deleteMany({
    identifier: email,
    type,
  });

  // Generate new OTP
  const otp = generateOTP();

  // Calculate expiry
  const expiresAt = new Date(
    Date.now() +
    OTP_EXPIRY_MINUTES * 60 * 1000
  );

  // Save OTP
  await OTP.create({
    identifier: email,
    otp,
    type,
    expiresAt,
  });

  return otp;
};


// ================================
// VERIFY OTP
// ================================

export const verifyOTP = async (
  identifier,
  otp,
  type = "EMAIL_VERIFICATION"
) => {

  const otpRecord = await OTP.findOne({
    identifier,
    type,
  }).sort({
    createdAt: -1,
  });


  // OTP not found
  if (!otpRecord) {
    return {
      valid: false,
      message: "OTP not found",
    };
  }


  // Check expiry
  if (otpRecord.expiresAt < new Date()) {

    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    return {
      valid: false,
      message: "OTP has expired",
    };
  }


  // Check OTP
  if (otpRecord.otp !== otp) {

    return {
      valid: false,
      message: "Invalid OTP",
    };
  }


  // Delete OTP after successful verification
  await OTP.deleteOne({
    _id: otpRecord._id,
  });


  return {
    valid: true,
    message: "OTP verified successfully",
  };
};