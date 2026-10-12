import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="bn"><body><ToastProvider/><SiteHeader/>{children}<SiteFooter/></body></html>;
}