"use client";

import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { SETTINGS_API_URL } from "@/lib/apiConfig";

export default function Security() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", ok: true });

  function onChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return setMsg({ text: "New passwords do not match.", ok: false });
    }
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${SETTINGS_API_URL}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!data.success) return setMsg({ text: data.message || "Password update failed.", ok: false });
      setMsg({ text: "Password updated successfully!", ok: true });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setMsg({ text: "Server connection failed.", ok: false });
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "currentPassword", label: "CURRENT PASSWORD", key: "current", placeholder: "Enter current password" },
    { name: "newPassword", label: "NEW PASSWORD", key: "new", placeholder: "Enter new password" },
    { name: "confirmPassword", label: "CONFIRM PASSWORD", key: "confirm", placeholder: "Enter confirm password" },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Security"
        description="Manage your password and account security settings"
        icon={Shield}
      />

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        {fields.map(({ name, label, key, placeholder }) => (
          <Input
            key={name}
            label={label}
            type={show[key] ? "text" : "password"}
            name={name}
            value={form[name]}
            onChange={onChange}
            required
            placeholder={placeholder}
            endElement={
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, [key]: !p[key] }))}
                className="text-slate-400 hover:text-slate-600 transition p-1"
                aria-label="Toggle password visibility"
              >
                {show[key] ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        ))}

        {msg.text && (
          <div
            className={`text-xs font-bold px-4 py-3 rounded-2xl border ${
              msg.ok
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "bg-red-50 border-red-200 text-red-500"
            }`}
          >
            {msg.text}
          </div>
        )}

        <div className="pt-2">
          <Button type="submit" loading={loading} className="px-7 py-3.5 text-sm font-extrabold rounded-2xl">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
