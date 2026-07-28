import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Wrench className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-700">FieldFlow</h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            Book Service
          </Link>
        </div>
      </div>
    </nav>
  );
}