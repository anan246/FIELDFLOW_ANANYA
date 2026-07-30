const roleInfo = {
  customer:   { tag: "Customer Account",   title: "Customer Profile",   desc: "Manage your personal information and booking preferences." },
  technician: { tag: "Technician Account", title: "Technician Profile", desc: "Manage your skills, availability and service details." },
  dispatcher: { tag: "Dispatcher Account", title: "Dispatcher Profile", desc: "Manage your office details and assignment preferences." },
  admin:      { tag: "Admin Account",      title: "Admin Profile",      desc: "Manage your administrator account and platform settings." },
};

export default function ProfileHeader({ user }) {
  const info = roleInfo[user?.role] || roleInfo.customer;

  return (
    <section className="profile-header">
      <div className="profile-overlay">
        <div className="profile-header-content">
          <span className="profile-tag">{info.tag}</span>
          <h1>{info.title}</h1>
          <p>{info.desc}</p>
          <div className="breadcrumb">
            Home <span>/</span> Profile
          </div>
        </div>
      </div>
    </section>
  );
}
