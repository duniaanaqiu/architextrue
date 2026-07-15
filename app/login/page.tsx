"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username atau password tidak valid.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex bg-background">
      {/* Left side: Premium Image/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="relative z-10 p-16 flex flex-col items-center text-center">
          <div className="w-48 h-16 relative mb-8">
            <Image
              src="/assets/images/layout/logo-white.png"
              alt="ARCHITEXTRUE Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-display text-4xl text-on-primary font-semibold mb-4 leading-tight">
            Administrator<br />Workspace
          </h1>
          <p className="font-body text-on-primary/80 text-lg max-w-sm">
            Platform eksklusif untuk manajemen konten dan portofolio ARCHITEXTRUE.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Mobile background decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full lg:hidden"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden w-40 h-12 relative mb-12">
            <Image
              src="/assets/images/layout/logo-primary.png"
              alt="ARCHITEXTRUE Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          <div className="mb-10">
            <h2 className="font-display text-3xl font-semibold text-primary mb-3">Sign In</h2>
            <p className="font-body text-on-surface-variant">
              Silakan masukkan Username dan Password Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error font-body text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="font-body text-sm font-semibold text-primary" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-outline" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant/50 rounded-xl font-body text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="admin_username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-sm font-semibold text-primary" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-outline" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-surface border border-outline-variant/50 rounded-xl font-body text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-body font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors duration-300 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
