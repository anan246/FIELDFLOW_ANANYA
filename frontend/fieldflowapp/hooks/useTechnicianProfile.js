"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function useTechnicianProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (_) {}

    async function fetchProfile() {
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
            setProfile(data.data);
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        }
      } catch (_) {
        // Fallback gracefully to stored user
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error: null };
}
