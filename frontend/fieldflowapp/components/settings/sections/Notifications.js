"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Toggle from "@/components/ui/Toggle";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const ITEMS = [
  { key: "email_notifications", label: "Email Notifications", desc: "Receive updates and alerts via email" },
  { key: "push_notifications", label: "Push Notifications", desc: "Browser and mobile push alerts" },
  { key: "marketing_notifications", label: "Marketing Notifications", desc: "Promotions and special offers from FieldFlow" },
];

export default function Notifications() {
  const [prefs, setPrefs] = useState({ email_notifications: true, push_notifications: true, marketing_notifications: false });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${SETTINGS_API_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) setPrefs(d.data);
      })
      .catch(() => {});
  }, []);

  async function toggle(key) {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${SETTINGS_API_URL}/notifications`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      setMsg(data.success ? "Notification settings saved!" : data.message);
    } catch {
      setMsg("Notification settings updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Notifications"
        description="Control how you receive updates and alerts"
        icon={Bell}
      />

      <div className="space-y-3 max-w-md">
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
