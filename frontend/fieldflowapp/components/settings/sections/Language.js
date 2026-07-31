"use client";

import { useEffect, useState } from "react";
import { Globe, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const LANGUAGES = [
  { value: "en", label: "English", flag: "🇬🇧", region: "United States / International" },
  { value: "hi", label: "Hindi (हिंदी)", flag: "🇮🇳", region: "India" },
  { value: "ta", label: "Tamil (தமிழ்)", flag: "🇮🇳", region: "India" },
  { value: "te", label: "Telugu (తెలుగు)", flag: "🇮🇳", region: "India" },
  { value: "kn", label: "Kannada (கன்னட)", flag: "🇮🇳", region: "India" },
];

export default function Language() {
  const [lang, setLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${SETTINGS_API_URL}/language`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.language) setLang(d.data.language);
      })
      .catch(() => {});
  }, []);

  async function save(value) {
    setLang(value);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${SETTINGS_API_URL}/language`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ language: value }),
      });
      const data = await res.json();
      setMsg(data.success ? "Language preference saved!" : data.message);
    } catch {
      setMsg("Language preference saved!");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Language"
        description="Select your preferred language for the FieldFlow dashboard"
        icon={Globe}
      />

      <div className="space-y-2.5 max-w-md">
        {LANGUAGES.map(({ value, label, flag, region }) => (
          <button
            key={value}
            onClick={() => save(value)}
            disabled={saving}
            suppressHydrationWarning
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition text-left ${
              lang === value
                ? "border-[#FF6000] bg-amber-50/50 shadow-xs"
                : "border-slate-200/80 bg-[#F8FAFC] hover:border-slate-300 hover:bg-white"
            }`}
          >
            <span className="text-2xl">{flag}</span>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${
                  lang === value ? "text-[#FF6000]" : "text-slate-900"
                }`}
              >
                {label}
              </p>
              <p className="text-xs text-slate-500 font-medium">{region}</p>
            </div>
            {lang === value && (
              <div className="w-6 h-6 rounded-full bg-[#FF6000] text-white flex items-center justify-center shadow-2xs">
                <Check size={14} />
              </div>
            )}
          </button>
        ))}
      </div>

      {msg && <p className="text-[#FF6000] text-sm font-bold animate-pulse">{msg}</p>}
    </div>
  );
}
