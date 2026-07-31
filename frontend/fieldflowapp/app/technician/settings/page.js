import { Settings, Bell, Lock, Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="text-orange-500" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="space-y-5">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bell />
            <span>Notifications</span>
          </div>

          <input type="checkbox" defaultChecked />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Lock />
            <span>Change Password</span>
          </div>

          <button className="text-orange-500">Update</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Moon />
            <span>Dark Mode</span>
          </div>

          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}