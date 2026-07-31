import "./profile.css";

import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import AccountInfo from "./AccountInfo";
import Preferences from "./Preferences";
import Security from "./Security";
import ActionButtons from "./ActionButtons";

export default function ProfilePage() {
  return (
    <main className="profile-page">
      <ProfileHeader />
      <PersonalInfo />
      <AccountInfo />
      <Preferences />
      <Security />
      <ActionButtons />
      
    </main>
  );
}
