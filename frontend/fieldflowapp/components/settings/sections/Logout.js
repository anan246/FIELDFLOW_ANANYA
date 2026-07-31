"use client";

import { useRouter } from "next/navigation";
import { LogOut, AlertTriangle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function Logout() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Logout"
        description="Sign out of your active FieldFlow session"
        icon={LogOut}
      />

      <div className="max-w-md bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            Are you sure you want to log out? You will need to sign in again with your credentials to access your dashboard.
          </p>
        </div>
        <Button variant="danger" onClick={handleLogout} className="w-full">
          <LogOut size={16} /> Sign Out of FieldFlow
        </Button>
      </div>
    </div>
  );
}
