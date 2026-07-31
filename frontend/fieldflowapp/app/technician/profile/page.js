import {
  User,
  Mail,
  Phone,
  MapPin,
  Wrench,
  Star,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold mx-auto">
            R
          </div>

          <h2 className="text-2xl font-semibold mt-4">
            Rajesh Kumar
          </h2>

          <p className="text-gray-500">
            Electrician
          </p>

          <div className="flex justify-center items-center gap-1 mt-4 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold">4.9</span>
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <Info icon={<User size={18} />} label="Name" value="Rajesh Kumar" />
            <Info icon={<Mail size={18} />} label="Email" value="rajesh@email.com" />
            <Info icon={<Phone size={18} />} label="Phone" value="+91 9876543210" />
            <Info icon={<MapPin size={18} />} label="Location" value="Bengaluru" />
            <Info icon={<Wrench size={18} />} label="Specialization" value="Electrical Services" />
            <Info icon={<Shield size={18} />} label="Experience" value="6 Years" />
          </div>

          <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-orange-500 mt-1">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}