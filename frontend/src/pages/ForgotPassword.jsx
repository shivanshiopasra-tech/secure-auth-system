import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

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
        "/auth/forgot-password",
        { email }
      );

      setMessage(response.data.message);

      localStorage.setItem(
        "resetEmail",
        email
      );

      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to process request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Forgot Password</h1>

        <p className="subtitle">
          Enter your email to receive a reset OTP
        </p>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>

        </form>

        <Link className="page-link" to="/login">
          Back to Login
        </Link>

      </div>
    </div>
  );
}

export default ForgotPassword;