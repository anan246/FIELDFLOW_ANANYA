"use client";

import Image from "next/image";
import { Wrench, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "customer") {
        try {
          const list = JSON.parse(localStorage.getItem("allRegisteredCustomers") || "[]");
          const exists = list.some((c) => c.id === data.user.id || c.email === data.user.email);
          if (!exists) {
            list.unshift({
              id: data.user.id || Date.now(),
              name: data.user.name || "Customer User",
              email: data.user.email,
              phone: data.user.phone || "9876543210",
              address: data.user.address || "Bengaluru",
              city: data.user.city || "Bengaluru",
              role: "customer",
              created_at: new Date().toISOString(),
            });
            localStorage.setItem("allRegisteredCustomers", JSON.stringify(list));
          }
        } catch (_) {}
      }

      try {
        window.dispatchEvent(new CustomEvent("fieldflow_customer_registered", { detail: data.user }));
        window.dispatchEvent(new Event("storage"));
      } catch (_) {}

      const role = data.user.role;
      if (role === "admin") router.push("/admin");
      else if (role === "customer") router.push("/customer/dashboard");
      else if (role === "technician") router.push("/technician/dashboard");
      else if (role === "dispatcher") router.push("/dispatcher");
      else router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

        <div className="hidden lg:flex flex-col items-center justify-center px-8">
          <Image
            src="/images/login-illustration.png"
            alt="FieldFlow Illustration"
            width={500}
            height={500}
            className="w-full max-w-md"
          />

          <h2 className="text-4xl font-bold text-[#2D2F39] mt-8 text-center">
            Trusted Home Services
          </h2>

          <p className="text-gray-500 text-center mt-4 max-w-md leading-7">
            Book verified professionals, track your service requests, and manage everything from one secure platform.
          </p>
        </div>

        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-orange-100 p-8 mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Wrench className="text-orange-500 w-8 h-8" />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-[#2D2F39]">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Sign in to your <span className="font-semibold text-orange-500">FieldFlow</span> account
              <br />
              and manage your home services with ease.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-gray-300 px-4 py-3 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <a
                href="/forget-password"
                className="text-sm text-orange-500 hover:text-orange-600 hover:underline font-medium transition"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all text-white py-3 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-orange-500 hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
