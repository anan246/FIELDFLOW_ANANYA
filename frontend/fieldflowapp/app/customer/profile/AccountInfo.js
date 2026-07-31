"use client";

import { useEffect, useState } from "react";

export default function AccountInfo() {
  const [user, setUser] = useState(null);

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
        console.error("Account info error:", error);
      }
    }

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="section">
        <section className="account-info">
          <h2>Account Information</h2>
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  const memberSince = new Date(user.created_at).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="section">
      <section className="account-info">
        <h2>Account Information</h2>

        <div className="account-grid">
          <div className="info-card">
            <h4>User ID</h4>
            <p>USR{String(user.id).padStart(3, "0")}</p>
          </div>

          <div className="info-card">
            <h4>Role</h4>
            <p>Customer</p>
          </div>

          <div className="info-card">
            <h4>Status</h4>
            <p>Active</p>
          </div>

          <div className="info-card">
            <h4>Member Since</h4>
            <p>{memberSince}</p>
          </div>
        </div>
      </section>
    </div>
  );
}