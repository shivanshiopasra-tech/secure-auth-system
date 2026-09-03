import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await API.put(
        "/users/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      setMessage(
        response.data.message || "Password changed successfully"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="form-container change-password-card">

        <div className="page-icon">
          
        </div>

        <div className="page-header">
          <h1>Change Password</h1>

          <p>
            Create a strong new password to keep your account secure.
          </p>
        </div>


        {message && (
          <div className="alert alert-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            ⚠ {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Current Password</label>

            <div className="input-wrapper">

              <span className="input-icon">
                
              </span>

              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label>New Password</label>

            <div className="input-wrapper">

              <span className="input-icon">
                
              </span>

              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label>Confirm New Password</label>

            <div className="input-wrapper">

              <span className="input-icon">
            
              </span>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <p className="password-hint">
            Use at least 8 characters with uppercase,
            lowercase, number and special character.
          </p>


          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner"></span>
                Changing Password...
              </>
            ) : (
              <>
                 Change Password
              </>
            )}

          </button>

        </form>


        <div className="auth-divider">
          <span>ACCOUNT</span>
        </div>


        <button
          className="secondary-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default ChangePassword;