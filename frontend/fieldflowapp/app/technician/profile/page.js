"use client";

import "@/app/customer/profile/profile.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function TechnicianProfilePage() {
  const [user, setUser] = useState({
    name: "Technician User",
    email: "technician@fieldflow.in",
    phone: "9876543210",
    category: "Electrician",
    experience: 5,
    working_area: "Bengaluru",
    available_today: true,
    created_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      if (stored.name || stored.email) {
        setUser((prev) => ({ ...prev, ...stored }));
      }
    } catch {}

    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/settings/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (response.ok && data.data) {
            setUser((prev) => ({ ...prev, ...data.data }));
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        }
      } catch {
        // Fallback silently to stored
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "January 2026";

  return (
    <main className="profile-page">
      {/* Header */}
      <section className="profile-header">
        <div className="profile-overlay">
          <div className="profile-header-content">
            <span className="profile-tag">Technician Account</span>
            <h1>Technician Profile</h1>
            <p>Manage your skills, working area, and availability preferences.</p>
            <div className="breadcrumb">
              Home <span>/</span> Profile
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info */}
      <section className="personal-info section">
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-image-placeholder text-4xl font-bold bg-orange-500 text-white rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-4 border-4 border-orange-500">
              {user.name?.charAt(0).toUpperCase() || "T"}
            </div>
            <h2>{user.name}</h2>
            <span className="role-badge">Technician</span>
            <button type="button" className="edit-photo-btn mt-3">
              Change Photo
            </button>
          </div>
        </div>

        <div className="profile-right">
          <h2>Technician Information</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={user.name || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email || ""} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" value={user.phone || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Service Category</label>
                <input type="text" value={user.category || ""} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="text" value={user.experience ? `${user.experience} Years` : "N/A"} readOnly />
              </div>
              <div className="form-group">
                <label>Working Area / City</label>
                <input type="text" value={user.working_area || user.workingArea || user.city || ""} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Available Today</label>
                <input type="text" value={user.available_today ? "Available" : "Not Available"} readOnly />
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Account Info */}
      <div className="section">
        <section className="account-info">
          <h2>Account Information</h2>
          <div className="account-grid">
            <div className="info-card">
              <h4>User ID</h4>
              <p>TCH{String(user.id || 1).padStart(3, "0")}</p>
            </div>
            <div className="info-card">
              <h4>Role</h4>
              <p>Technician</p>
            </div>
            <div className="info-card">
              <h4>Duty Status</h4>
              <p>{user.available_today ? "Available Today" : "Off Duty"}</p>
            </div>
            <div className="info-card">
              <h4>Member Since</h4>
              <p>{memberSince}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Preferences */}
      <div className="section">
        <section className="preferences">
          <h2>Preferences</h2>
          <div className="preference-grid">
            <div className="form-group">
              <label>Language</label>
              <select defaultValue="English">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notifications</label>
              <select defaultValue="Enabled">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="form-group">
              <label>Theme</label>
              <select defaultValue="Light">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* Security */}
      <div className="section">
        <section className="security">
          <h2>Security</h2>
          <div className="security-box">
            <div className="form-group">
              <label>Password</label>
              <input type="password" value="************" readOnly />
            </div>
            <button type="button" className="change-password-btn">
              Change Password
            </button>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <section className="action-buttons">
        <button type="button" className="edit-btn">Edit Profile</button>
        <button type="button" className="save-btn">Save Changes</button>
        <button type="button" className="cancel-btn">Cancel</button>
      </section>
    </main>
  );
}
