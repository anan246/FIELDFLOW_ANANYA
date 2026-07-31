"use client";

import { useEffect, useState } from "react";
import { Globe, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const LANGUAGES = [
  { value: "en", label: "English", flag: "🇬🇧", region: "International / Default" },
  { value: "hi", label: "Hindi (हिंदी)", flag: "🇮🇳", region: "India" },
  { value: "kn", label: "Kannada (கன்னட / ಕನ್ನಡ)", flag: "🇮🇳", region: "Karnataka, India" },
  { value: "ta", label: "Tamil (தமிழ்)", flag: "🇮🇳", region: "Tamil Nadu, India" },
  { value: "te", label: "Telugu (తెలుగు)", flag: "🇮🇳", region: "Andhra / Telangana, India" },
  { value: "mr", label: "Marathi (मराठी)", flag: "🇮🇳", region: "Maharashtra, India" },
  { value: "bn", label: "Bengali (বাংলা)", flag: "🇮🇳", region: "West Bengal, India" },
  { value: "es", label: "Spanish (Español)", flag: "🇪🇸", region: "Spain / Latin America" },
];

export default function Language() {
  const [lang, setLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("fieldflow_language") || "en";
      setLang(savedLang);
      applyLanguage(savedLang);
    } catch (_) {}

    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${SETTINGS_API_URL}/language`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.data?.language) {
            setLang(d.data.language);
            applyLanguage(d.data.language);
          }
        })
        .catch(() => {});
    }
  }, []);

  function applyLanguage(selectedLang) {
    try {
      localStorage.setItem("fieldflow_language", selectedLang);
      document.documentElement.lang = selectedLang;
      window.dispatchEvent(new CustomEvent("fieldflow_language_change", { detail: selectedLang }));
      window.dispatchEvent(new Event("storage"));
    } catch (_) {}
  }

  async function save(value) {
    setLang(value);
    applyLanguage(value);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${SETTINGS_API_URL}/language`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ language: value }),
        });
      }
      const selected = LANGUAGES.find((l) => l.value === value);
      setMsg(`${selected?.label || "Language"} selected & applied in real time! 🌐`);
    } catch {
      const selected = LANGUAGES.find((l) => l.value === value);
      setMsg(`${selected?.label || "Language"} selected & applied in real time! 🌐`);
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Language Settings"
        description="Select your preferred display language for FieldFlow"
        icon={Globe}
      />

      <div className="space-y-2.5 max-w-md">
        {LANGUAGES.map(({ value, label, flag, region }) => (
          <button
            key={value}
            type="button"
            onClick={() => save(value)}
            disabled={saving}
            suppressHydrationWarning
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition text-left cursor-pointer ${
              lang === value
                ? "border-[#FF6000] bg-amber-50/70 shadow-xs"
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
              <div className="w-6 h-6 rounded-full bg-[#FF6000] text-white flex items-center justify-center shadow-xs shrink-0">
                <Check size={14} />
              </div>
            )}
          </button>
        ))}
      </div>

      {msg && <p className="text-[#FF6000] text-sm font-bold animate-bounce">{msg}</p>}
    </div>
  );
}
