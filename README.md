# Secure Authentication System

A full-stack Secure Authentication System built using React, Node.js, Express.js, and MongoDB.

## Live Demo
- Frontend: https://secure-auth-system-mu.vercel.app
- Backend API: https://secure-auth-system-84xx.onrender.com

## Features
- User Registration and Login
- JWT Authentication
- Access and Refresh Tokens
- Protected Routes
- Email OTP Login
- Email Verification
- OTP Resend
- Forgot Password
- Reset Password
- Change Password
- Edit Profile
- Protected Dashboard
- Password Hashing
- CORS Configuration
- MongoDB Atlas Integration

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Nodemailer
- bcrypt

### Deployment
- Vercel
- Render
- MongoDB Atlas

## Project Structure

```text
secure-auth-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── user.routes.js
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/shivanshiopasra-tech/secure-auth-system.git
cd secure-auth-system
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login user |
| POST | /api/v1/auth/send-login-otp | Send Email OTP |
| POST | /api/v1/auth/login-with-otp | Login using OTP |
| POST | /api/v1/auth/forgot-password | Request password reset |
| POST | /api/v1/auth/reset-password | Reset password |
| POST | /api/v1/auth/verify-email | Verify email |

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/v1/users/profile | Get user profile |
| PUT | /api/v1/users/profile | Update user profile |
| PUT | /api/v1/users/change-password | Change password |

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

## Challenges Solved

- CORS configuration between Vercel and Render
- MongoDB connection issues
- React Router production routing
- Vercel SPA routing
- Case-sensitive import issues
- Backend route import issues
- API integration and deployment issues

## Future Improvements

- Google OAuth
- GitHub OAuth
- Two-Factor Authentication
- Rate Limiting
- Redis Integration
- Docker
- Automated Testing
- CI/CD Pipeline

## Author

**Shivanshi Parashar**

- GitHub: https://github.com/shivanshiopasra-tech
- LinkedIn: https://www.linkedin.com/in/shivanshi-parashar-4b05362b6/

## License

This project is created for educational and development purposes.
