import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import userRoutes from "./routes/user.routes.js";

import errorHandler from "./middleware/error.middleware.js";


const app = express();


// Security
app.use(helmet());


// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


// Body Parser
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// Cookie Parser
app.use(cookieParser());


// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure Auth API is running",
  });
});


// Auth Routes
app.use(
  "/api/v1/auth",
  authRoutes
);


// User Routes
app.use(
  "/api/v1/users",
  userRoutes
);


// Error Handler - MUST BE LAST
app.use(errorHandler);


export default app;