"use client";

import Security from "./sections/Security";
import Notifications from "./sections/Notifications";
import Appearance from "./sections/Appearance";
import Language from "./sections/Language";
import Privacy from "./sections/Privacy";
import HelpSupport from "./sections/HelpSupport";
import About from "./sections/About";
import Logout from "./sections/Logout";
import Card from "@/components/ui/Card";

const SECTIONS = {
  security: Security,
  notifications: Notifications,
  appearance: Appearance,
  language: Language,
  privacy: Privacy,
  help: HelpSupport,
  about: About,
  logout: Logout,
};

export default function SettingsContent({ active }) {
  const Section = SECTIONS[active] || Security;
  return (
    <Card className="flex-1 min-h-[520px]">
      <Section />
    </Card>
  );
}
