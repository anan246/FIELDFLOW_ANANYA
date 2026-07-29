export default function PersonalInfo() {
  return (
    <section className="personal-info section">

      <div className="profile-left">

        <div className="profile-card">

          <img
            src="https://img.magnific.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Profile"
            className="profile-image"
          />

          <h2>John Smith</h2>

          <span className="role-badge">
            Customer
          </span>

          <button className="edit-photo-btn">
            Change Photo
          </button>

        </div>

      </div>

      <div className="profile-right">

        <h2>Personal Information</h2>

        <form>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Smith" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@email.com" />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+91 9876543210" />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="johnsmith" />
            </div>

          </div>

        </form>

      </div>

    </section>
  );
}