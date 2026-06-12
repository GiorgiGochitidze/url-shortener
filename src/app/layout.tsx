import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Free to use URL shortener",
};
/* eslint-disable @next/next/no-img-element */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full h-auto flex flex-col bg-[#0E131E] relative">
        <img
          src="/swirl.png"
          alt="Swirl Image"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <img
          src="/cubes.png"
          alt="Cubes Image"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
