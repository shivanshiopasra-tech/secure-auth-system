import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function PhoneOTPLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/auth/send-phone-otp",
        { phone }
      );

      setMessage(response.data.message);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/auth/login-with-phone-otp",
        {
          phone,
          otp,
        }
      );

      const data = response.data.data;

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Phone OTP Login</h1>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        {step === 1 && (
          <form onSubmit={sendOTP}>

            <label>Phone Number</label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOTP}>

            <p>OTP sent to {phone}</p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />

            <button disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </button>

          </form>
        )}

        <Link className="page-link" to="/login">
          Back to Login
        </Link>

      </div>
    </div>
  );
}

export default PhoneOTPLogin;