"use client";
import "../profile.css";
import { useEffect, useState } from "react";
import ProfileHeader from "../ProfileHeader";
import AccountInfo from "../AccountInfo";
import Preferences from "../Preferences";
import Security from "../Security";
import ActionButtons from "../ActionButtons";

export default function TechnicianProfile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <main className="profile-page">
      <ProfileHeader user={user} />

      <section className="personal-info section">
        <div className="profile-left">
          <div className="profile-card">
            <img
              src="https://img.magnific.com/free-photo/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-with-straight-blonde-hair-expresses-positiveness-poses_176420-13176.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Profile" className="profile-image"
            />
            <h2>{user?.name || "—"}</h2>
            <span className="role-badge">Technician</span>
            <button className="edit-photo-btn">Change Photo</button>
          </div>
        </div>

        <div className="profile-right">
          <h2>Technician Information</h2>
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
                <label>Service Category</label>
                <input type="text" defaultValue={user?.category || ""} placeholder="e.g. Electrician" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Experience (years)</label>
                <input type="number" defaultValue={user?.experience || ""} placeholder="Years of experience" />
              </div>
              <div className="form-group">
                <label>Working Area</label>
                <input type="text" defaultValue={user?.working_area || ""} placeholder="City / Area" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Available Today</label>
                <input type="text" value={user?.available_today ? "Yes" : "No"} readOnly />
              </div>
            </div>
          </form>
        </div>
      </section>

      <AccountInfo user={user} />
      <Preferences user={user} />
      <Security />
      <ActionButtons />
    </main>
  );
}
