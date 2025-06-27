import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
