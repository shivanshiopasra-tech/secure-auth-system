import Joi from "joi";

// ================================
// REGISTER VALIDATION
// ================================

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});


// ================================
// VERIFY EMAIL OTP
// ================================

export const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),
});


// ================================
// RESEND OTP
// ================================

export const resendOTPSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});


// ================================
// LOGIN
// ================================

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});


// ================================
// REFRESH TOKEN
// ================================

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required(),
});
// ================================
// SEND LOGIN OTP
// ================================

export const sendLoginOTPSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});


// ================================
// LOGIN WITH OTP
// ================================

export const loginWithOTPSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),
});
// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
});


// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),

  newPassword: Joi.string()
    .min(6)
    .required(),
});
// ==========================================
// SEND PHONE OTP
// ==========================================

export const sendPhoneOTPSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must contain 10 to 15 digits",
    }),
});


// ==========================================
// LOGIN WITH PHONE OTP
// ==========================================

export const loginWithPhoneOTPSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),

  otp: Joi.string()
    .length(6)
    .required(),
});