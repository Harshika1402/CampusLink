import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusLink — Placement Cell Portal | Connecting Talent with Opportunities",
  description: "CampusLink is an enterprise-grade placement management platform for universities to manage the complete recruitment lifecycle between students, placement cells, recruiters, and alumni.",
  icons: {
    icon: [
      { url: "/images/CampusLink Favicon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/CampusLink Favicon.png",
    apple: "/images/CampusLink Favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${instrumentSerif.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#171A1F] antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
