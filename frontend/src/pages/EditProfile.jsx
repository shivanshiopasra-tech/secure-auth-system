import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { getProfile(); }, []);

  const getProfile = async () => {
    try {
      const response = await API.get("/users/profile");
      const user = response.data.data.user;
      setFormData({ name: user.name || "", phone: user.phone || "" });
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await API.put("/users/profile", formData);
      setMessage(response.data.message);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const firstLetter = formData.name ? formData.name.charAt(0).toUpperCase() : "U";

  if (pageLoading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f8f9ff", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid #e5e7eb", borderTop: "4px solid #4f46e5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#6b7280" }}>Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f1f5f9" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "240px", background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)",
        display: "flex", flexDirection: "column", flexShrink: 0,
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)"
      }}>
        {/* Brand */}
        <div style={{ padding: "28px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🔐</div>
            <h2 style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: 0 }}>SecureAuth</h2>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: "20px 12px" }}>
          {[
            { icon: "🏠", label: "Dashboard", action: () => navigate("/dashboard") },
            { icon: "👤", label: "Profile", active: true, action: () => {} },
            { icon: "🔒", label: "Security", action: () => navigate("/change-password") },
            { icon: "⚙️", label: "Settings", action: () => {} },
          ].map((item) => (
            <div key={item.label} onClick={item.action}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "10px", marginBottom: "4px",
                cursor: "pointer",
                background: item.active ? "rgba(255,255,255,0.15)" : "transparent",
                color: item.active ? "white" : "#a5b4fc",
              }}
              onMouseEnter={(e) => { if (!item.active) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (!item.active) e.currentTarget.style.background = "transparent"; }}
            >
              <span>{item.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              {item.active && <div style={{ marginLeft: "auto", width: "6px", height: "6px", background: "#818cf8", borderRadius: "50%" }} />}
            </div>
          ))}
        </nav>

        {/* User bottom */}
        <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "15px" }}>
              {firstLetter}
            </div>
            <p style={{ color: "white", fontSize: "13px", fontWeight: 600, margin: 0 }}>{formData.name}</p>
          </div>
          <button onClick={() => navigate("/dashboard")}
            style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#a5b4fc", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            ← Back to Dashboard
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "100%", maxWidth: "520px" }}>

          {/* Page Header */}
          <div style={{ marginBottom: "32px" }}>
            <p style={{ color: "#4f46e5", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>ACCOUNT SETTINGS</p>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>Edit Profile</h1>
            <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>Update your personal information below.</p>
          </div>

          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", background: "white", borderRadius: "16px", padding: "24px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>
            <div style={{ width: "72px", height: "72px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "28px", flexShrink: 0 }}>
              {firstLetter}
            </div>
            <div>
              <p style={{ color: "#111827", fontWeight: 700, fontSize: "18px", margin: "0 0 4px" }}>{formData.name || "Your Name"}</p>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>Update your name and phone number</p>
            </div>
          </div>

          {/* Form Card */}
          <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>

            {/* Success */}
            {message && (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#16a34a", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                ✅ {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>👤</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    style={{
                      width: "100%", padding: "14px 14px 14px 44px",
                      border: "1.5px solid #e5e7eb", borderRadius: "10px",
                      fontSize: "15px", outline: "none", background: "#fafafa",
                      boxSizing: "border-box", color: "#111827",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#4f46e5"; e.target.style.background = "white"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#fafafa"; }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
                  Phone Number <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>📱</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    style={{
                      width: "100%", padding: "14px 14px 14px 44px",
                      border: "1.5px solid #e5e7eb", borderRadius: "10px",
                      fontSize: "15px", outline: "none", background: "#fafafa",
                      boxSizing: "border-box", color: "#111827",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "#4f46e5"; e.target.style.background = "white"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#fafafa"; }}
                  />
                </div>
                <p style={{ color: "#9ca3af", fontSize: "12px", marginTop: "6px" }}>
                  Used for Phone OTP login
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "15px",
                  background: loading ? "#a5b4fc" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  color: "white", border: "none", borderRadius: "10px",
                  fontSize: "16px", fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? "Updating..." : "Save Changes →"}
              </button>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;