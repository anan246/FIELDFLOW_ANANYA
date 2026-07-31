"use client";

import { HelpCircle, Mail, MessageCircle, FileText, ExternalLink, Phone } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const LINKS = [
  { icon: FileText, label: "Documentation", desc: "Browse system guides and technical documentation", href: "#" },
  { icon: MessageCircle, label: "Live Support Chat", desc: "Chat directly with FieldFlow support agent", href: "#" },
  { icon: Mail, label: "Email Support", desc: "support@fieldflow.in", href: "mailto:support@fieldflow.in" },
];

export default function HelpSupport() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Help & Support"
        description="Get assistance and access FieldFlow documentation"
        icon={HelpCircle}
      />

      <div className="space-y-3 max-w-md">
        {LINKS.map(({ icon: Icon, label, desc, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#FF6000] hover:bg-white transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-[#FF6000]" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 text-sm font-bold group-hover:text-[#FF6000] transition">{label}</p>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">{desc}</p>
            </div>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-[#FF6000] transition" />
          </a>
        ))}
      </div>

      <div className="max-w-md bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <Phone size={20} className="text-[#FF6000] shrink-0 mt-0.5" />
        <div>
          <p className="text-[#FF6000] font-bold text-sm">Need urgent operational support?</p>
          <p className="text-slate-700 text-xs mt-1 font-medium">
            Call support at <span className="text-slate-900 font-bold">+91 98765 43210</span> — available Mon–Sat, 9am–6pm IST.
          </p>
        </div>
      </div>
    </div>
  );
}
