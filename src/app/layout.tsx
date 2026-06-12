import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Free to use URL shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full h-auto flex flex-col bg-[#0E131E]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
