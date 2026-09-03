import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email: formData.email,
          },
        });
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Left Side */}
      <div className="auth-banner">
        <div className="banner-content">

          <div className="logo">
            🔐 SecureAuth
          </div>

          <div className="banner-text">
            <span className="tag">SECURE • SIMPLE • FAST</span>

            <h1>
              Your security is our priority.
            </h1>

            <p>
              Create your account and experience a modern,
              secure authentication system built with the
              latest technologies.
            </p>
          </div>

          <div className="security-features">

            <div className="security-item">
              <span>✓</span>
              <div>
                <h4>Email Verification</h4>
                <p>Secure your account with OTP verification.</p>
              </div>
            </div>

            <div className="security-item">
              <span>✓</span>
              <div>
                <h4>JWT Authentication</h4>
                <p>Industry-standard secure authentication.</p>
              </div>
            </div>

            <div className="security-item">
              <span>✓</span>
              <div>
                <h4>Protected Data</h4>
                <p>Your account information stays protected.</p>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* Right Side */}
      <div className="auth-form-section">

        <div className="auth-card">

          <div className="mobile-logo">
            🔐 SecureAuth
          </div>

          <div className="form-header">

            <span className="form-badge">
              CREATE ACCOUNT
            </span>

            <h2>Welcome!</h2>

            <p>
              Create your account to get started.
            </p>

          </div>


          {error && (
            <div className="alert alert-error">
              <span>⚠</span>
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success">
              <span>✓</span>
              {message}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="form-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span className="input-icon">👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div className="form-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">✉</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Password */}
            <div className="form-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            <div className="password-hint">
              Password should contain at least 8 characters.
            </div>


            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          <div className="auth-divider">

            <span>OR</span>

          </div>


          <div className="login-redirect">

            Already have an account?

            <Link to="/login">
              Sign In
            </Link>

          </div>


          <div className="terms">

            By creating an account, you agree to our
            Terms of Service and Privacy Policy.

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;