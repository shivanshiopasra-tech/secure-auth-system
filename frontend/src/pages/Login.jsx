import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await API.post("/auth/login", { email, password });
      const data = response.data.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* LEFT PANEL — same as Register */}
      <div style={{
        width: "45%", background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 50px", position: "relative", overflow: "hidden"
      }}>
        {/* Background circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(99,102,241,0.3)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(67,56,202,0.4)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 700, marginBottom: "40px" }}>SecureAuth</h1>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 16px", display: "inline-block", marginBottom: "24px" }}>
            <span style={{ color: "#a5b4fc", fontSize: "13px", letterSpacing: "2px" }}>SECURE • SIMPLE • FAST</span>
          </div>
          <h2 style={{ color: "white", fontSize: "36px", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px" }}>
            Your security is our<br />priority.
          </h2>
          <p style={{ color: "#c7d2fe", fontSize: "15px", lineHeight: 1.7, marginBottom: "48px" }}>
            Sign in and continue your journey with a modern, secure authentication system.
          </p>

          {[
            { title: "Email Verification", desc: "Secure your account with OTP verification." },
            { title: "JWT Authentication", desc: "Industry-standard secure authentication." },
            { title: "Protected Data", desc: "Your account information stays protected." },
          ].map((item) => (
            <div key={item.title} style={{ marginBottom: "24px" }}>
              <p style={{ color: "white", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{item.title}</p>
              <p style={{ color: "#a5b4fc", fontSize: "13px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — Login Form */}
      <div style={{
        flex: 1, background: "#f8f9ff", display: "flex",
        alignItems: "center", justifyContent: "center", padding: "40px"
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* Header */}
          <p style={{ color: "#4f46e5", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", marginBottom: "12px" }}>
            WELCOME BACK
          </p>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Sign In</h2>
          <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "32px" }}>
            Enter your credentials to access your account.
          </p>

          {/* Error */}
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px" }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>✉️</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "14px 14px 14px 42px",
                    border: "1.5px solid #e5e7eb", borderRadius: "10px",
                    fontSize: "15px", outline: "none", background: "white",
                    boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "14px 60px 14px 42px",
                    border: "1.5px solid #e5e7eb", borderRadius: "10px",
                    fontSize: "15px", outline: "none", background: "white",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4f46e5", fontSize: "13px", fontWeight: 600 }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <Link to="/forgot-password" style={{ color: "#4f46e5", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "#a5b4fc" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "white", border: "none", borderRadius: "10px",
                fontSize: "16px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "20px", transition: "opacity 0.2s",
              }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            <span style={{ color: "#9ca3af", fontSize: "13px" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          </div>

          {/* OTP Login Buttons */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <Link to="/email-otp-login" style={{
              flex: 1, textAlign: "center", padding: "12px",
              border: "1.5px solid #e5e7eb", borderRadius: "10px",
              color: "#374151", fontSize: "13px", fontWeight: 600,
              textDecoration: "none", background: "white",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            >
              ✉️ Email OTP
            </Link>
            <Link to="/phone-otp-login" style={{
              flex: 1, textAlign: "center", padding: "12px",
              border: "1.5px solid #e5e7eb", borderRadius: "10px",
              color: "#374151", fontSize: "13px", fontWeight: 600,
              textDecoration: "none", background: "white",
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}
            >
              📱 Phone OTP
            </Link>
          </div>

          {/* Register link */}
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;