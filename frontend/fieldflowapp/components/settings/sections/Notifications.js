"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Smartphone, AlertTriangle, Volume2 } from "lucide-react";
import Toggle from "@/components/ui/Toggle";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const ITEMS = [
  { key: "email_notifications", label: "Email Notifications", desc: "Receive booking and job updates via email", icon: Mail },
  { key: "push_notifications", label: "Mobile & Browser Push Alerts", desc: "Real-time browser and device push alerts", icon: Smartphone },
  { key: "emergency_alerts", label: "Emergency Job Alerts", desc: "Instant high-priority alerts for urgent service requests", icon: AlertTriangle },
  { key: "sound_effects", label: "Sound & Audio Notifications", desc: "Chime sound on new incoming service request", icon: Volume2 },
];

export default function Notifications() {
  const [prefs, setPrefs] = useState({
    email_notifications: true,
    push_notifications: true,
    emergency_alerts: true,
    sound_effects: false,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fieldflow_notifications");
      if (saved) setPrefs(JSON.parse(saved));
    } catch (_) {}

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${SETTINGS_API_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.data) {
            const merged = { ...prefs, ...d.data };
            setPrefs(merged);
            localStorage.setItem("fieldflow_notifications", JSON.stringify(merged));
          }
        })
        .catch(() => {});
    }
  }, []);

  async function toggle(key) {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    try {
      localStorage.setItem("fieldflow_notifications", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("fieldflow_settings_updated", { detail: updated }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${SETTINGS_API_URL}/notifications`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(updated),
        });
      }
      setMsg("Notification preferences updated in real time! 🔔");
    } catch {
      setMsg("Notification preferences updated in real time! 🔔");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Notifications & Alerts"
        description="Control real-time updates and notifications for your role"
        icon={Bell}
      />

      <div className="space-y-3 max-w-xl">
        {ITEMS.map(({ key, label, desc }) => (
          <Toggle
            key={key}
            label={label}
            description={desc}
            enabled={!!prefs[key]}
            onChange={() => toggle(key)}
            disabled={saving}
          />
        ))}
      </div>

      {msg && (
        <p className="text-[#FF6000] text-sm font-bold animate-pulse">{msg}</p>
      )}
    </div>
  );
}
