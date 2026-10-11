import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারদর",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
