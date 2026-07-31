export default function ProfileHeader() {
  return (
    <section className="profile-header">
      <div className="profile-overlay">
        <div className="profile-header-content">
          <span className="profile-tag">My Account</span>

          <h1>Profile Settings</h1>

          <p>
            Manage your personal information and account settings.
          </p>

          <div className="breadcrumb">
            Home <span>/</span> Profile
          </div>
        </div>
      </div>
    </section>
  );
}