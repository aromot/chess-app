import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Billie Chess",
  description: "Prepare your openings.",
};

export default function RootLayout({
  children,
  modalLogin,
  modalRegister,
}: Readonly<{
  children: React.ReactNode;
  modalLogin: React.ReactNode;
  modalRegister: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <SessionProvider>
          {children}
          {modalLogin}
          {modalRegister}
        </SessionProvider>
      </body>
    </html>
  );
}
