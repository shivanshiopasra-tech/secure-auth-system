import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => { getProfile(); }, []);

  const getProfile = async () => {
    try {
      const response = await API.get("/users/profile");
      setUser(response.data.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
      if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f8f9ff", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid #e5e7eb", borderTop: "4px solid #4f46e5", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>Loading your secure dashboard...</p>
      </div>
    </div>
  );

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const menuItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard", action: () => setActiveMenu("dashboard") },
    { id: "profile", icon: "👤", label: "Profile", action: () => navigate("/edit-profile") },
    { id: "security", icon: "🔒", label: "Security", action: () => navigate("/change-password") },
    //{ id: "settings", icon: "⚙️", label: "Settings", action: () => setActiveMenu("settings") },
  ];

  const stats = [
    { label: "Account Status", value: "Active", color: "#16a34a", bg: "#f0fdf4", icon: "✅" },
    { label: "Email Verification", value: user?.isEmailVerified ? "Verified ✓" : "Pending", color: user?.isEmailVerified ? "#4f46e5" : "#d97706", bg: user?.isEmailVerified ? "#eef2ff" : "#fffbeb", icon: "✉️" },
    { label: "Phone Number", value: user?.phone ? "Added" : "Not Added", color: user?.phone ? "#0891b2" : "#6b7280", bg: user?.phone ? "#ecfeff" : "#f9fafb", icon: "📱" },
    { label: "Auth Method", value: "JWT + OTP", color: "#7c3aed", bg: "#faf5ff", icon: "🔑" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f1f5f9" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "240px", background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)",
        display: "flex", flexDirection: "column", padding: "0", flexShrink: 0,
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
          {menuItems.map((item) => (
            <div key={item.id} onClick={item.action}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "10px", marginBottom: "4px",
                cursor: "pointer", transition: "all 0.2s",
                background: activeMenu === item.id ? "rgba(255,255,255,0.15)" : "transparent",
                color: activeMenu === item.id ? "white" : "#a5b4fc",
              }}
              onMouseEnter={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (activeMenu !== item.id) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span style={{ fontSize: "14px", fontWeight: activeMenu === item.id ? 600 : 400 }}>{item.label}</span>
              {activeMenu === item.id && <div style={{ marginLeft: "auto", width: "6px", height: "6px", background: "#818cf8", borderRadius: "50%" }} />}
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "15px", flexShrink: 0 }}>
              {firstLetter}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "white", fontSize: "13px", fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</p>
              <p style={{ color: "#a5b4fc", fontSize: "11px", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            style={{ width: "100%", padding: "10px", background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "8px", color: "#fca5a5", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
              Welcome back, {user?.name} 👋
            </h1>
            <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
              Manage your account and security settings.
            </p>
          </div>
          <div style={{ width: "52px", height: "52px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "20px", boxShadow: "0 4px 12px rgba(79,70,229,0.4)" }}>
            {firstLetter}
          </div>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "10px", padding: "12px 16px", marginBottom: "24px", color: "#dc2626", fontSize: "14px" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ color: "#6b7280", fontSize: "12px", fontWeight: 600, margin: 0 }}>{stat.label}</p>
                <span style={{ fontSize: "20px" }}>{stat.icon}</span>
              </div>
              <p style={{ color: stat.color, fontSize: "16px", fontWeight: 700, margin: 0, background: stat.bg, padding: "4px 10px", borderRadius: "20px", display: "inline-block" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

          {/* Profile Card */}
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Profile Information</h3>
              <button onClick={() => navigate("/edit-profile")}
                style={{ padding: "6px 14px", background: "#eef2ff", border: "none", borderRadius: "8px", color: "#4f46e5", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                Edit
              </button>
            </div>

            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Phone Number", value: user?.phone || "Not Added" },
              { label: "Member Since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}>{row.label}</span>
                <span style={{ color: "#111827", fontSize: "13px", fontWeight: 600 }}>{row.value}</span>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px" }}>
              <span style={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}>Email Status</span>
              <span style={{ padding: "4px 12px", background: user?.isEmailVerified ? "#f0fdf4" : "#fef9c3", color: user?.isEmailVerified ? "#16a34a" : "#ca8a04", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>
                {user?.isEmailVerified ? "✓ Verified" : "⚠ Pending"}
              </span>
            </div>
          </div>

          {/* Security Card */}
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "24px" }}>Account Security</h3>

            {[
              { icon: "🔐", title: "Password Authentication", desc: "Your account is protected with password authentication.", color: "#4f46e5", bg: "#eef2ff" },
              { icon: "✉️", title: "Email Verification", desc: user?.isEmailVerified ? "Your email address has been verified." : "Please verify your email address.", color: "#0891b2", bg: "#ecfeff" },
              { icon: "🔑", title: "JWT Authentication", desc: "Your session is protected using secure access tokens.", color: "#7c3aed", bg: "#faf5ff" },
              { icon: "📱", title: "OTP Authentication", desc: "Email and phone OTP login options are available.", color: "#16a34a", bg: "#f0fdf4" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ width: "38px", height: "38px", background: item.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ color: "#111827", fontSize: "13px", fontWeight: 700, margin: "0 0 3px" }}>{item.title}</h4>
                  <p style={{ color: "#6b7280", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}

            <button onClick={() => navigate("/change-password")}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", border: "none", borderRadius: "10px", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "8px" }}>
              🔒 Change Password
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;