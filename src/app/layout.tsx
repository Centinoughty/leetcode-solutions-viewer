import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Leetcode Solutions",
  description: "Centinoughty's solutions for his leetcode profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 font-sans antialiased flex flex-col min-h-screen">
        <main className="grow flex">{children}</main>

        <footer className="py-4 bg-white border-t border-gray-200 text-center text-sm text-gray-600 shadow-inner">
          © {new Date().getFullYear()} Centinoughty · All rights reserved.
        </footer>

        <div className="py-4 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-200">
          <p className="mb-1">
            Built by{" "}
            <Link
              href="https://nadeem-temp.vercel.app"
              className="font-semibold text-gray-700"
            >
              Nadeem M Siyam
            </Link>
          </p>
          <div className="flex justify-center gap-4 text-xl">
            <Link
              href="https://github.com/Centinoughty"
              target="_blank"
              className="hover:underline"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://linkedin.com/in/nade"
              target="_blank"
              className="hover:underline"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
