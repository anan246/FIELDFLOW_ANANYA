"use client";

import { useEffect, useState } from "react";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SettingsCard from "@/components/settings/SettingsCard";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const THEMES = [
  { value: "light", label: "Light", icon: Sun, desc: "Bright & clean interface" },
  { value: "dark", label: "Dark", icon: Moon, desc: "Sleek dark mode" },
  { value: "system", label: "System", icon: Monitor, desc: "Match system theme" },
];

export default function Appearance() {
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("fieldflow_theme") || "light";
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } catch (_) {}

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${SETTINGS_API_URL}/appearance`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.data?.theme) {
            setTheme(d.data.theme);
            applyTheme(d.data.theme);
          }
        })
        .catch(() => {});
    }
  }, []);

  function applyTheme(selectedTheme) {
    try {
      localStorage.setItem("fieldflow_theme", selectedTheme);
      const root = document.documentElement;
      if (selectedTheme === "dark") {
        root.classList.add("dark");
        document.body.classList.add("dark");
      } else if (selectedTheme === "light") {
        root.classList.remove("dark");
        document.body.classList.remove("dark");
      } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
          document.body.classList.add("dark");
        } else {
          root.classList.remove("dark");
          document.body.classList.remove("dark");
        }
      }

      window.dispatchEvent(new CustomEvent("fieldflow_theme_change", { detail: selectedTheme }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}
  }

  async function save(value) {
    setTheme(value);
    applyTheme(value);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${SETTINGS_API_URL}/appearance`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ theme: value }),
        });
      }
      setMsg(`${value.toUpperCase()} theme active in real time! ✨`);
    } catch {
      setMsg(`${value.toUpperCase()} theme active in real time! ✨`);
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Appearance & Theme"
        description="Customize the real-time interface theme for your role"
        icon={Palette}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
        {THEMES.map(({ value, label, icon: Icon, desc }) => (
          <SettingsCard
            key={value}
            active={theme === value}
            onClick={() => save(value)}
            className="flex flex-col items-center text-center p-5 cursor-pointer rounded-2xl border transition-all hover:scale-[1.02]"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition ${
                theme === value ? "bg-[#FF6000] text-white shadow-lg shadow-orange-500/25" : "bg-slate-100 text-slate-500"
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

      {msg && <p className="text-[#FF6000] text-sm font-bold animate-bounce">{msg}</p>}
    </div>
  );
}
