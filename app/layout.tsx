import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://masael24.com"),
  title: {
    default: "মাসায়েল২৪ | নির্ভরযোগ্য দ্বীনি মাসআলা ও ফতোয়া",
    template: "%s | মাসায়েল২৪",
  },
  description:
    "কুরআন, সুন্নাহ ও নির্ভরযোগ্য ফিকহি সূত্রের আলোকে বাংলা মাসআলা-মাসায়েল পড়ুন, বিষয়ভিত্তিক অনুসন্ধান করুন এবং নিজের দ্বীনি প্রশ্ন জমা দিন।",
  applicationName: "মাসায়েল২৪",
  keywords: [
    "মাসায়েল২৪",
    "মাসআলা",
    "মাসআলা মাসায়েল",
    "বাংলা ফতোয়া",
    "ইসলামি প্রশ্ন উত্তর",
    "হানাফি ফিকহ",
    "কুরআন হাদিস",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
