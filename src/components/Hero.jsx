import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <p className="eyebrow">প্রতিদিনের বাজার, এক জায়গায়</p>
        <h1>আজকের বাজার দর জানুন সহজেই</h1>
        <p>
          নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন, তুলনা করুন এবং বাজারের পরিবর্তন
          সম্পর্কে আপডেট থাকুন।
        </p>
        <Link href="#products" className="btn btn-primary">
          পণ্যের দাম দেখুন
        </Link>
      </div>

      <div className="hero-image">
        <img src="/bazar-hero.png" alt="বাজারের পণ্য" />
      </div>
    </section>
  );
}
