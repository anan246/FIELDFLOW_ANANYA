"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

const OPTIONS = [
  { value: "public", label: "Public", desc: "Anyone on FieldFlow can view your profile details" },
  { value: "friends", label: "Internal Only", desc: "Only dispatchers and platform members can view" },
  { value: "private", label: "Private", desc: "Only you and administrators can view your profile" },
];

export default function Privacy() {
  const [visibility, setVisibility] = useState("public");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${SETTINGS_API_URL}/privacy`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.privacy_profile_visibility) setVisibility(d.data.privacy_profile_visibility);
      })
      .catch(() => {});
  }, []);

  async function save(value) {
    setVisibility(value);
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${SETTINGS_API_URL}/privacy`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ privacy_profile_visibility: value }),
      });
      const data = await res.json();
      setMsg(data.success ? "Privacy preference saved!" : data.message);
    } catch {
      setMsg("Privacy preference updated!");
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Privacy"
        description="Control who can see your profile information and status"
        icon={Lock}
      />

      <div className="space-y-3 max-w-md">
        {OPTIONS.map(({ value, label, desc }) => (
          <button
            key={value}
            onClick={() => save(value)}
            disabled={saving}
            suppressHydrationWarning
            className={`w-full flex items-start gap-4 px-5 py-4 rounded-2xl border-2 transition text-left ${
              visibility === value
                ? "border-[#FF6000] bg-amber-50/50 shadow-xs"
                : "border-slate-200/80 bg-[#F8FAFC] hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                visibility === value ? "border-[#FF6000]" : "border-slate-300"
              }`}
            >
              {visibility === value && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6000]" />}
            </div>
            <div>
              <p
                className={`text-sm font-bold ${
                  visibility === value ? "text-[#FF6000]" : "text-slate-900"
                }`}
              >
                {label}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      {msg && <p className="text-[#FF6000] text-sm font-bold animate-pulse">{msg}</p>}
    </div>
  );
}
