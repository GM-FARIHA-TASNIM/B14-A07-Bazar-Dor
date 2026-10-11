import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 Error</p>
      <h1>পেজটি পাওয়া যায়নি</h1>
      <p>লিংকটি ভুল হতে পারে অথবা পেজটি সরানো হয়েছে।</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
