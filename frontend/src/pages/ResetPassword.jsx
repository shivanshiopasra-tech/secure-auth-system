import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await API.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage(response.data.message);

      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="auth-container">
        <div className="auth-card">

          <h2>Email not found</h2>

          <Link to="/forgot-password">
            Go to Forgot Password
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Reset Password</h1>

        <p className="subtitle">
          Reset password for {email}
        </p>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>OTP</label>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;