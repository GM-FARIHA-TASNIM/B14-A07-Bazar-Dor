import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর দেখুন।",
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
