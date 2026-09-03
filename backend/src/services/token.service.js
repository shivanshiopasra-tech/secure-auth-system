import jwt from "jsonwebtoken";


// Generate Access Token
export const generateAccessToken = (userId) => {

  return jwt.sign(

    {
      userId: userId.toString(),
    },

    process.env.JWT_ACCESS_SECRET,

    {
      expiresIn:
        process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }

  );
};


// Generate Refresh Token
export const generateRefreshToken = (userId) => {

  return jwt.sign(

    {
      userId: userId.toString(),
    },

    process.env.JWT_REFRESH_SECRET,

    {
      expiresIn:
        process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }

  );
};


// Verify Access Token
export const verifyAccessToken = (token) => {

  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET
  );

};


// Verify Refresh Token
export const verifyRefreshToken = (token) => {

  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );

};