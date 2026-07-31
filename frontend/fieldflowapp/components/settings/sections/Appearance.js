"use client";

import { useEffect, useState } from "react";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SettingsCard from "@/components/settings/SettingsCard";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const THEMES = [
  { value: "light", label: "Light", icon: Sun, desc: "Bright and clean look" },
  { value: "dark", label: "Dark", icon: Moon, desc: "Sleek dark mode" },
  { value: "system", label: "System", icon: Monitor, desc: "Match system settings" },
];

export default function Appearance() {
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${SETTINGS_API_URL}/appearance`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.theme) setTheme(d.data.theme);
      })
      .catch(() => {});
  }, []);

  async function save(value) {
    setTheme(value);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${SETTINGS_API_URL}/appearance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ theme: value }),
      });
      const data = await res.json();
      setMsg(data.success ? "Theme updated!" : data.message);
    } catch {
      setMsg("Theme preference updated locally.");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Appearance"
        description="Customize the dashboard interface appearance"
        icon={Palette}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
        {THEMES.map(({ value, label, icon: Icon, desc }) => (
          <SettingsCard
            key={value}
            active={theme === value}
            onClick={() => save(value)}
            className="flex flex-col items-center text-center py-6 cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition ${
                theme === value ? "bg-[#FF6000] text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              <Icon size={24} />
            </div>
            <h4
              className={`text-sm font-bold ${
                theme === value ? "text-[#FF6000]" : "text-slate-900"
              }`}
            >
              {label}
            </h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">{desc}</p>
          </SettingsCard>
        ))}
      </div>

      {msg && <p className="text-[#FF6000] text-sm font-bold animate-pulse">{msg}</p>}
    </div>
  );
}
