"use client";
import "./profile.css";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";
import Preferences from "./Preferences";
import Security from "./Security";
import ActionButtons from "./ActionButtons";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

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
