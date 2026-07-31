export default function AccountInfo({ user }) {
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

  return (
    <div className="section">
      <section className="account-info">
        <h2>Account Information</h2>
        <div className="account-grid">
          <div className="info-card">
            <h4>User ID</h4>
            <p>{user?.id ? `USR${String(user.id).padStart(3, "0")}` : "—"}</p>
          </div>
          <div className="info-card">
            <h4>Role</h4>
            <p style={{ textTransform: "capitalize" }}>{user?.role || "—"}</p>
          </div>
          <div className="info-card">
            <h4>Status</h4>
            <p>Active</p>
          </div>
          <div className="info-card">
            <h4>Member Since</h4>
            <p>{joined}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
