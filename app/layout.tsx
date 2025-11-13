import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Numerology Reading - Discover Your Destiny",
  description: "Unlock the secret language of your birth date with professional numerology readings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
