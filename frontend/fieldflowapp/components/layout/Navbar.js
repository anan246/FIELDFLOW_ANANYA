import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔧</span>
        <h1 className="text-2xl font-bold text-blue-700">FieldFlow</h1>
      </div>

      <div className="flex items-center gap-8">
        <Link className="text-gray-700"href="/">Home</Link>
        <Link  className="text-gray-700" href="/services">Services</Link>
        <Link className="text-gray-700" href="/about">About</Link>
        <Link className="text-gray-700" href="/contact">Contact</Link>
        <Link className="text-gray-700" href="/login">Login</Link>
        <Link href="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Register
        </Link>
      </div>
    </nav>
  );
}