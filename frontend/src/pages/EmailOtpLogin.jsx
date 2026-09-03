import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function EmailOTPLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await API.post("/auth/send-login-otp", { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/login-with-otp", { email, otp });
      const data = response.data.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await API.post("/auth/send-login-otp", { email });
      setMessage(response.data.message || "OTP sent successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eef2ff 100%)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
      boxSizing: "border-box",
    },
    icon: {
      width: "56px",
      height: "56px",
      margin: "0 auto 16px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      background: "#eff6ff",
    },
    heading: {
      textAlign: "center",
      margin: "0 0 8px",
      fontSize: "24px",
      fontWeight: "700",
      color: "#0f172a",
    },
    subtitle: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "14px",
      margin: "0 0 24px",
    },
    steps: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "24px",
      gap: "12px",
    },
    stepItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "13px",
      fontWeight: "500",
    },
    stepNumber: {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "12px",
      fontWeight: "600",
    },
    line: {
      width: "32px",
      height: "2px",
      background: "#e2e8f0",
    },
    alertSuccess: {
      background: "#f0fdf4",
      border: "1px solid #bbf7d0",
      color: "#166534",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      textAlign: "center",
    },
    alertError: {
      background: "#fef2f2",
      border: "1px solid #fecaca",
      color: "#991b1b",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "14px",
      textAlign: "center",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#334155",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px 14px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      marginBottom: "20px",
    },
    otpInput: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      fontSize: "22px",
      letterSpacing: "8px",
      textAlign: "center",
      fontWeight: "600",
      outline: "none",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      background: "#2563eb",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
    },
    disabledButton: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      background: "#93c5fd",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "not-allowed",
    },
    otpInfo: {
      textAlign: "center",
      background: "#f8fafc",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "20px",
      border: "1px solid #e2e8f0",
    },
    otpEmail: {
      color: "#2563eb",
      fontWeight: "600",
      wordBreak: "break-all",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "16px",
    },
    textButton: {
      background: "transparent",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "600",
      padding: "0",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#94a3b8",
      margin: "24px 0",
      fontSize: "12px",
      fontWeight: "500",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#e2e8f0",
    },
    loginLink: {
      display: "block",
      textAlign: "center",
      padding: "10px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      textDecoration: "none",
      color: "#475569",
      fontWeight: "600",
      fontSize: "14px",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
      color: "#64748b",
      marginBottom: 0,
    },
    registerLink: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>📧</div>

        <h1 style={styles.heading}>Email OTP Login</h1>
        <p style={styles.subtitle}>
          Login securely without entering your password
        </p>

        {/* STEP INDICATOR */}
        <div style={styles.steps}>
          <div style={{ ...styles.stepItem, color: "#2563eb" }}>
            <span
              style={{
                ...styles.stepNumber,
                background: "#2563eb",
                color: "#ffffff",
              }}
            >
              1
            </span>
            Email
          </div>

          <div style={styles.line}></div>

          <div
            style={{
              ...styles.stepItem,
              color: step >= 2 ? "#2563eb" : "#94a3b8",
            }}
          >
            <span
              style={{
                ...styles.stepNumber,
                background: step >= 2 ? "#2563eb" : "#e2e8f0",
                color: step >= 2 ? "#ffffff" : "#64748b",
              }}
            >
              2
            </span>
            Verify OTP
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && <div style={styles.alertSuccess}>✓ {message}</div>}

        {/* ERROR MESSAGE */}
        {error && <div style={styles.alertError}>⚠ {error}</div>}

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <form onSubmit={sendOTP}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.disabledButton : styles.button}
            >
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </form>
        )}

        {/* STEP 2 - OTP */}
        {step === 2 && (
          <form onSubmit={verifyOTP}>
            <div style={styles.otpInfo}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>📬</div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "13px",
                  margin: "0 0 4px",
                }}
              >
                We sent a verification code to
              </p>
              <div style={styles.otpEmail}>{email}</div>
            </div>

            <label style={styles.label}>Enter 6-Digit OTP</label>
            <input
              style={styles.otpInput}
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.disabledButton : styles.button}
            >
              {loading ? "Verifying..." : "🔐 Verify & Login"}
            </button>

            <div style={styles.actions}>
              <button
                type="button"
                onClick={resendOTP}
                disabled={loading}
                style={styles.textButton}
              >
                Resend OTP
              </button>

              <button
                type="button"
                style={styles.textButton}
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setMessage("");
                  setError("");
                }}
              >
                Change Email
              </button>
            </div>
          </form>
        )}

        {/* DIVIDER */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* BACK TO LOGIN */}
        <Link to="/login" style={styles.loginLink}>
          ← Back to Password Login
        </Link>

        {/* REGISTER */}
        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default EmailOTPLogin;