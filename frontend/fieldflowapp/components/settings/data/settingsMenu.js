import {
  User, Shield, Bell, Palette, Globe,
  Lock, HelpCircle, Info, LogOut,
} from "lucide-react";

export const SETTINGS_MENU = [
  { id: "profile",      label: "Profile",        icon: User,        isLink: true  },
  { id: "security",     label: "Security",       icon: Shield,      isLink: false },
  { id: "notifications",label: "Notifications",  icon: Bell,        isLink: false },
  { id: "appearance",   label: "Appearance",     icon: Palette,     isLink: false },
  { id: "language",     label: "Language",       icon: Globe,       isLink: false },
  { id: "privacy",      label: "Privacy",        icon: Lock,        isLink: false },
  { id: "help",         label: "Help & Support", icon: HelpCircle,  isLink: false },
  { id: "about",        label: "About",          icon: Info,        isLink: false },
  { id: "logout",       label: "Logout",         icon: LogOut,      isLink: false, danger: true },
];

export const PROFILE_LINKS = {
  customer:   "/customer/profile",
  technician: "/technician/profile",
  dispatcher: "/dispatcher/profile",
  admin:      "/admin/profile",
};
