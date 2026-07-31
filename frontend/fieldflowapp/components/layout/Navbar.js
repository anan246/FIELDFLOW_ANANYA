"use client";

import Link from "next/link";
import { Wrench, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1F2937]/80 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <Wrench className="w-7 h-7 text-orange-400" />
          <h1 className="text-2xl font-bold text-white">FieldFlow</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="font-medium text-white hover:text-orange-400 transition"
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
            Register
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1F2937] px-6 pb-6 flex flex-col gap-4">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-white hover:text-orange-400 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <Link
            href="/login"
            className="border border-orange-400 text-orange-400 px-5 py-2.5 rounded-lg font-medium text-center hover:bg-orange-400 hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium text-center transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
