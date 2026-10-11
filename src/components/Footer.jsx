import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            বাজার দর
          </Link>
          <p>
            নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানার সহজ মাধ্যম। সঠিক তথ্যের মাধ্যমে
            আপনার বাজার পরিকল্পনা হোক আরও সহজ।
          </p>
        </div>

        <div className="footer-links">
          <h3>দ্রুত লিংক</h3>
          <Link href="/">হোম</Link>
          <Link href="/signin">সাইন ইন</Link>
          <Link href="/signup">সাইন আপ</Link>
          <Link href="/profile">আমার প্রোফাইল</Link>
        </div>

        <div className="footer-links">
          <h3>পণ্যের বিভাগ</h3>
          <Link href="/category/chal">চাল</Link>
          <Link href="/category/dal">ডাল</Link>
          <Link href="/category/tel">তেল</Link>
          <Link href="/category/sobji">সবজি</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
