"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function PersonalInfo() {
  const [user, setUser] = useState({
    name: "Customer User",
    email: "customer@fieldflow.in",
    phone: "9876543210",
    address: "Bangalore, India",
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
            setUser(data.data);
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        }
      } catch {
        // Fallback silently to localStorage user
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading && !user.name) {
    return (
      <section className="personal-info section">
        <div className="profile-right">
          <h2>Loading profile...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="personal-info section">
      <div className="profile-left">
        <div className="profile-card">
          <div className="profile-image-placeholder">
            {user.name?.charAt(0).toUpperCase() || "C"}
          </div>

          <h2>{user.name}</h2>

          <span className="role-badge">
            {user.role || "Customer"}
          </span>

          <button type="button" className="edit-photo-btn">
            Change Photo
          </button>
        </div>
      </div>

      <div className="profile-right">
        <h2>Personal Information</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={user.name || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={user.phone || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Address / City</label>
              <input
                type="text"
                value={user.city || user.address || ""}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}