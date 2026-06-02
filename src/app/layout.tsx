import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollHud from "@/components/ScrollHud";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lenis × Next.js — Smooth Scroll Showcase",
  description:
    "A Next.js app where every scroll animation is powered by Lenis: smooth scroll, scrollTo, velocity, parallax, reveal and horizontal scroll.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-neutral-950 text-white">
        {/* One Lenis instance wraps the whole app → every scroll is smooth. */}
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <Navbar />
          <ScrollHud />
          <ScrollToTop />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
