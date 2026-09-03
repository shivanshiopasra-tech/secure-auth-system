import mongoose from "mongoose";


const otpSchema = new mongoose.Schema(

  {
    identifier: {
      type: String,
      required: true,
    },


    otp: {
      type: String,
      required: true,
    },


    type: {
      type: String,
      required: true,
      default: "EMAIL_VERIFICATION",
    },


    expiresAt: {
      type: Date,
      required: true,
    },

  },

  {
    timestamps: true,
  }

);


const OTP = mongoose.model(
  "OTP",
  otpSchema
);


export default OTP;