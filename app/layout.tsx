import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";

// হেডিং ফন্ট
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

// বডি ফন্ট
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "মাসআলা শেয়ারিং",
    template: "%s | মাসআলা শেয়ারিং",
  },
  description: "কোরআন, হাদিস ও ফিকহের রেফারেন্সসহ নির্ভরযোগ্য মাসআলা সংকলন",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} ${hindSiliguri.variable}`}>
      <body>{children}</body>
    </html>
  );
}
