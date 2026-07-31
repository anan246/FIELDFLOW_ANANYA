"use client";
import "./profile.css";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";
import Preferences from "./Preferences";
import Security from "./Security";
import ActionButtons from "./ActionButtons";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setUser(u);
        if (u.role === "admin")           router.replace("/admin/profile");
        else if (u.role === "technician") router.replace("/technician/profile");
        else if (u.role === "dispatcher") router.replace("/dispatcher/profile");
        else router.replace("/customer/profile");
      } else {
        router.replace("/customer/profile");
      }
    } catch (_) {
      router.replace("/customer/profile");
    }
  }, [router]);

  return (
    <main className="profile-page">
      <ProfileHeader user={user} />
      <PersonalInfo user={user} />
      <AccountInfo user={user} />
      <Preferences user={user} />
      <Security />
      <ActionButtons />
    </main>
  );
}
