import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function VerifyEmail() {
  const navigate = useNavigate();

  const email = localStorage.getItem("verificationEmail");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If email is missing
  if (!email) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Email not found</h2>

        <p>
          Please register again before verifying your email.
        </p>

        <Link to="/register">
          Go to Register
        </Link>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await API.post(
        "/auth/verify-email",
        {
          email: email,
          otp: otp,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        localStorage.removeItem("verificationEmail");
        navigate("/login");
      }, 1500);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    } finally {
      setLoading(false);
    }
  };


  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {

      const response = await API.post(
        "/auth/resend-otp",
        {
          email: email,
        }
      );

      setMessage(response.data.message);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to resend OTP"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >

        <h1 style={{ textAlign: "center" }}>
          Verify Email
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Enter the OTP sent to:
        </p>

        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          {email}
        </p>


        {message && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            {message}
          </div>
        )}


        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            {error}
          </div>
        )}


        <form onSubmit={handleVerify}>

          <label>Enter OTP</label>

          <input
            type="text"
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              marginBottom: "20px",
              boxSizing: "border-box",
              textAlign: "center",
              fontSize: "20px",
              letterSpacing: "5px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>


        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >

          <p>Didn't receive OTP?</p>

          <button
            onClick={handleResendOTP}
            disabled={loading}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Resend OTP
          </button>

        </div>

      </div>
    </div>
  );
}

export default VerifyEmail;