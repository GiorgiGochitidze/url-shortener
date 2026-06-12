"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { PiSignInLight, PiSignOutLight } from "react-icons/pi";

const Navbar = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  return (
    <header className="backdrop-blur-md z-11 w-full h-20 p-5 flex items-center justify-between fixed top-0 left-0">
      <Link href="/">
        <p className="text-[#144EE3] font-bold text-2xl cursor-pointer">Linkly</p>
      </Link>
      <nav className="flex justify-center items-center gap-5">
        {isLoading ? (
          <div className="w-20 h-6 bg-slate-800 animate-pulse rounded-full" />
        ) : session ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <span className="outline-none text-[#C9CED6] text-sm hover:text-white transition-colors cursor-pointer">
                Dashboard
              </span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-[#181E29] font-bold border border-[#353C4A] px-4 py-2.5 rounded-full flex justify-center items-center text-white gap-1.25 cursor-pointer hover:bg-red-950/20 hover:border-red-900 transition-all"
            >
              Sign Out <PiSignOutLight size={15} />
            </button>
          </div>
        ) : (
          <>
            <Link href="/auth/signin">
              <button className="bg-[#181E29] font-bold border border-[#353C4A] px-4 py-2.5 rounded-full flex justify-center items-center text-white gap-1.25 cursor-pointer">
                Login <PiSignInLight size={15} />
              </button>
            </Link>

            <Link href="/auth/signup">
              <button className="bg-[#144EE3] font-bold px-4 py-2.5 rounded-full flex justify-center items-center text-white gap-1.25 cursor-pointer">
                Register Now
              </button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
