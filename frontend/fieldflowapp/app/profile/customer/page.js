"use client";
import "../profile.css";
import { useEffect, useState } from "react";
import ProfileHeader from "../ProfileHeader";
import AccountInfo from "../AccountInfo";
import Preferences from "../Preferences";
import Security from "../Security";
import ActionButtons from "../ActionButtons";

export default function CustomerProfile() {
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
            <span className="role-badge">Customer</span>
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
                <label>City</label>
                <input type="text" defaultValue={user?.city || ""} placeholder="City" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue={user?.address || ""} placeholder="Address" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" defaultValue={user?.pincode || ""} placeholder="Pincode" />
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
