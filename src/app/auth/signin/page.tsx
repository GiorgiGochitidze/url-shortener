"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
    router.refresh();
    router.push("/dashboard");
  }

  return (
    <div className=" z-10 w-full min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 flex flex-col gap-6"
        style={{
          background: "#181E29",
          border: "1px solid #353C4A",
        }}
      >
        {/* header */}
        <div className="flex flex-col gap-2 text-center">
          <h1
            className="bg-clip-text text-transparent font-bold text-3xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #144EE3 0%, #EB568E 19%, #A353AA 64%, #144EE3 100%)",
            }}
          >
            Welcome Back
          </h1>
          <p className="text-[#C9CED6] text-sm">Sign in to manage your links</p>
        </div>

        {/* error */}
        {error && (
          <p className="text-[#F87171] text-sm text-center bg-[#2E1A1A] px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* email */}
        <div className="flex flex-col gap-2">
          <label className="text-[#C9CED6] text-sm">Email</label>
          <div className="relative flex items-center">
            <FiMail size={16} color="#C9CED6" className="absolute left-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-12 rounded-full pl-10 pr-4 bg-[#0E131E] text-white text-sm outline-none placeholder:text-[#C9CED6]"
              style={{
                border: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(#0E131E, #0E131E), linear-gradient(90deg, #144EE3 10%, #353C4A 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />
          </div>
        </div>

        {/* password */}
        <div className="flex flex-col gap-2">
          <label className="text-[#C9CED6] text-sm">Password</label>
          <div className="relative flex items-center">
            <FiLock size={16} color="#C9CED6" className="absolute left-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 rounded-full pl-10 pr-4 bg-[#0E131E] text-white text-sm outline-none placeholder:text-[#C9CED6]"
              style={{
                border: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(#0E131E, #0E131E), linear-gradient(90deg, #144EE3 10%, #353C4A 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            />
          </div>
        </div>

        {/* submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 rounded-full bg-[#144EE3] text-white font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* footer */}
        <p className="text-[#C9CED6] text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#144EE3] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
