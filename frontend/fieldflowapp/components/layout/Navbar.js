import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1F2937]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          🔧 FieldFlow
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}