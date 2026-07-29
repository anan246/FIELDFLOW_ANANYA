import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black/40 to-transparent">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Wrench className="w-7 h-7 text-orange-400" />
          <h1 className="text-2xl font-bold text-white">FieldFlow</h1>
        </Link>

        <div className="flex items-center gap-8">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="font-medium text-white hover:text-orange-400"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/login"
            className="border border-orange-400 text-orange-400 px-5 py-2.5 rounded-lg font-medium hover:bg-orange-400 hover:text-white transition-all"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all"
          >
            Book Service
          </Link>
        </div>
      </div>
    </nav>
  );
}