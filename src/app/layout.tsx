import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// বাংলা ফন্ট সেটআপ
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
});

// অ্যাসাইনমেন্ট রিকোয়ারমেন্ট অনুযায়ী মেটাডাটা
export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "নিত্যপ্রয়োজনীয় বাজার দর ও মূল্য তালিকা",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.variable}>
        {/* টোস্ট নোটিফিকেশন যেন পুরো ওয়েবসাইটে কাজ করে */}
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
