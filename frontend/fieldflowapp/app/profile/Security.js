export default function Security() {
  return (
    <div className="section">-
      <section className="security">

        <h2>Security</h2>

        <div className="security-box">

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value="************"
              readOnly
            />
          </div>

          <button className="change-password-btn">
            Change Password
          </button>

        </div>

      </section>
    </div>
  );
}
