import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-badge">আপনার নিত্যদিনের বাজার সহযোগী</span>

          <h1>
            প্রতিদিনের বাজারদর
            <br />
            জানুন সহজেই
          </h1>

          <p>
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় পণ্যের বাজারদর এক জায়গায়
            দেখুন।
          </p>

          <div className="hero-actions">
            <Link href="#products" className="btn btn-primary">
              পণ্যের দাম দেখুন
            </Link>

            <Link href="/signup" className="btn btn-outline">
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/bazar-hero.png"
            alt="বাজারের বিভিন্ন পণ্য"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}
