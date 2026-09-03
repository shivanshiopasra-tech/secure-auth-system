import nodemailer from "nodemailer";


console.log("EMAIL HOST:", process.env.EMAIL_HOST);
console.log("EMAIL PORT:", process.env.EMAIL_PORT);
console.log("EMAIL USER:", process.env.EMAIL_USER);


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,

  port: Number(process.env.EMAIL_PORT),

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendOTPEmail = async (email, otp) => {

  await transporter.sendMail({

    from: `"Secure Auth System" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "Email Verification OTP",

    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
      
        <h2>Email Verification</h2>
        
        <p>Your OTP is:</p>
        
        <h1 style="letter-spacing: 5px;">
          ${otp}
        </h1>
        
        <p>
          This OTP will expire in 
          ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.
        </p>
        
        <p>Please do not share this OTP with anyone.</p>
        
      </div>
    `,
  });
};