export default function Preferences() {
  return (
    <div className="section">
      <section className="preferences">

        <h2>Preferences</h2>

        <div className="preference-grid">

          <div className="form-group">
            <label>Language</label>
            <select>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notifications</label>
            <select>
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Theme</label>
            <select>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

        </div>

      </section>
    </div>
  );
}
