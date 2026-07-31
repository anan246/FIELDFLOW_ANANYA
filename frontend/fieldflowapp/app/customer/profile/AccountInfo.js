"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function AccountInfo() {
  const [user, setUser] = useState({
    id: 1,
    role: "customer",
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      if (stored.id) setUser((prev) => ({ ...prev, ...stored }));
    } catch {}

    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/settings/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (response.ok && data.data) {
            setUser((prev) => ({ ...prev, ...data.data }));
          }
        }
      } catch {
        // Fallback silently
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
    <div className="section">
      <section className="account-info">
        <h2>Account Information</h2>

        <div className="account-grid">
          <div className="info-card">
            <h4>User ID</h4>
            <p>USR{String(user.id || 1).padStart(3, "0")}</p>
          </div>

          <div className="info-card">
            <h4>Role</h4>
            <p className="capitalize">{user.role || "Customer"}</p>
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