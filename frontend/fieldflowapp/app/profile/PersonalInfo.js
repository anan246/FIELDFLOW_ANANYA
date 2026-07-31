export default function PersonalInfo({ user }) {
  return (
    <section className="personal-info section">

      <div className="profile-left">
        <div className="profile-card">
          <img
            src="https://img.magnific.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Profile"
            className="profile-image"
          />
          <h2>{user?.name || "—"}</h2>
          <span className="role-badge">{user?.role || "User"}</span>
          <button className="edit-photo-btn">Change Photo</button>
        </div>
      </div>

      <div className="profile-right">
        <h2>Personal Information</h2>

        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user?.name || ""} placeholder="Full Name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user?.email || ""} placeholder="Email" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" defaultValue={user?.phone || ""} placeholder="+91 9876543210" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input type="text" value={user?.role || ""} readOnly />
            </div>
          </div>

          {/* Customer-specific */}
          {user?.role === "customer" && (
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" defaultValue={user?.city || ""} placeholder="City" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" defaultValue={user?.pincode || ""} placeholder="Pincode" />
              </div>
            </div>
          )}

          {/* Technician-specific */}
          {user?.role === "technician" && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Service Category</label>
                  <input type="text" defaultValue={user?.category || ""} placeholder="e.g. Electrician" />
                </div>
                <div className="form-group">
                  <label>Experience (years)</label>
                  <input type="number" defaultValue={user?.experience || ""} placeholder="Years" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Working Area</label>
                  <input type="text" defaultValue={user?.working_area || ""} placeholder="City / Area" />
                </div>
              </div>
            </>
          )}

          {/* Dispatcher-specific */}
          {user?.role === "dispatcher" && (
            <div className="form-row">
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" defaultValue={user?.employee_id || ""} placeholder="Employee ID" />
              </div>
              <div className="form-group">
                <label>Office Branch</label>
                <input type="text" defaultValue={user?.office_branch || ""} placeholder="Branch" />
              </div>
            </div>
          )}

          {/* Admin-specific */}
          {user?.role === "admin" && (
            <div className="form-row">
              <div className="form-group">
                <label>Admin Level</label>
                <input type="text" value="Super Admin" readOnly />
              </div>
              <div className="form-group">
                <label>Access</label>
                <input type="text" value="Full Platform Access" readOnly />
              </div>
            </div>
          )}

        </form>
      </div>

    </section>
  );
}
