"use client";

import { useEffect, useState } from "react";

export default function PersonalInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Temporary customer ID
  const userId = 1;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user");
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <section className="personal-info section">
        <div className="profile-right">
          <h2>Loading profile...</h2>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="personal-info section">
        <div className="profile-right">
          <h2>Unable to load profile</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="personal-info section">
      <div className="profile-left">
        <div className="profile-card">
          <div className="profile-image-placeholder">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user.name}</h2>

          <span className="role-badge">
            Customer
          </span>

          <button type="button" className="edit-photo-btn">
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
              <label>Address</label>
              <input
                type="text"
                value={user.address || ""}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}